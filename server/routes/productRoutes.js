const express = require('express');
const { createOrUpdateProduct, getProductByBarcode, getRecommendations } = require('../controllers/productController');
const router = express.Router();

router.post("/", createOrUpdateProduct);
router.get("/:barcode", getProductByBarcode);
router.get("/recommendations/search", getRecommendations);

module.exports = router;
