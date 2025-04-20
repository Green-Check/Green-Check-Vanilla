const Product = require("../models/Product");

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
