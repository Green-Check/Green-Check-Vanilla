const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  description: String,
  category: String,
  image: String,
  brand: String,
  price: Number,
  currency: {
    type: String,
    default: "INR"
  },
  healthScore: Number, // e.g., 0-100
  healthStatus: {
    type: String,
    enum: ["low", "moderate", "high"]
  },
  calories: Number,
  serving: {
    quantity: Number,
    unit: String,
    description: String
  },
  nutrients: {
    carbs: Number,
    protein: Number,
    fat: Number,
    fiber: Number,
    sugar: Number,
    sodium: Number
  },
  ingredients: [String],
  allergens: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
