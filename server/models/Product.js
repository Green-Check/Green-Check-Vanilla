// productModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: String,
    barcode: String,
    name: String,
    description: String,
    healthScore: Number,
    category: String,
    image: String,
    brand: String,
    lastUpdated: String,
    calories: Number,
    servingSize: String,
    nutrients: {
        carbs: Number,
        protein: Number,
        fat: Number
    },
    ingredients: [String],
    allergens: String,
    healthStatus: String,
    price: Number,
    pricePerServing: Number,
    valueRating: Number,
    incomeSuitability: [String],
    alternatives: [
        {
            id: String,
            name: String,
            description: String,
            healthScore: Number,
            image: String,
            healthStatus: String,
            price: Number,
            pricePerServing: Number,
            valueRating: Number,
            incomeSuitability: [String]
        }
    ]
});

module.exports = mongoose.model("Product", productSchema);
