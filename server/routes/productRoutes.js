const express = require('express');
const router = express.Router();
// const get = require('../controllers/productController');
// import { getProduct } from '../controllers/productController';
const { getProduct } = require('../controllers/productController');

// POST route for getting a product by barcode and income range
router.get('/getProduct', (req, res, next)=>{console.log("I am a middleware"); next}, getProduct);

module.exports = router;