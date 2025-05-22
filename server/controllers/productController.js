const Product = require("../models/Product");
const axios = require("axios");
// Create or update product
exports.createOrUpdateProduct = async (req, res) => {
  try {
    const { barcode } = req.body;
  
    const product = await Product.findOneAndUpdate(
      { barcode },
      req.body,
      { upsert: true, new: true }
    );

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Get product by barcode
exports.getProductByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;

    const product = await Product.findOne({ barcode });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

// Recommend healthier alternatives
exports.getRecommendations = async (req, res) => {
  try {
    const { barcode, incomeLevel } = req.query;

    const currentProduct = await Product.findOne({ barcode });
    if (!currentProduct) return res.status(404).json({ message: "Product not found" });

    const recommendations = await Product.find({
      category: currentProduct.category,
      healthScore: { $gt: currentProduct.healthScore },
      price: { $lte: getPriceByIncome(incomeLevel) }
    }).sort({ healthScore: -1 }).limit(5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
};

function getPriceByIncome(incomeLevel) {
  if (incomeLevel === "low") return 100;
  if (incomeLevel === "medium") return 300;
  return 1000;
}


// Get product by barcode and income range
// const Product = require('../models/product'); // Assuming you have a Mongoose Product model
exports.getProduct = async (req, res) => {

  // found at level-1 means in found in database
  // found at level-2 means in found in OpenFoodFacts API
  // found at level-3 means not found in both
    try {
        const { barcode, incomeRange } = req.body;

        // Step 1: Search in your MongoDB
        let product = await Product.findOne({ barcode });
        if (product) {
            console.log('level-1');
            return res.status(200).json({ product, level: 1 });
        }
        if (!product) {
            // Step 2: If not found, fetch from OpenFoodFacts API
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
            
            // Check if product exists in the API
            if (response.data.status === 0) {
              console.log("level-3");
                return res.status(404).json({ message: 'Product not found in OpenFoodFacts', level: 3 });
            }

            product = response.data.product;
        }
        console.log('level-2');
        return res.status(200).json({ product, level: 2 });
    } catch (error) {
        console.error('Error fetching product:', error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};