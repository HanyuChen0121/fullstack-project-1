const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../handlers/product');
const { getProduct } = require('../handlers/product');
const { getAllProduct } = require('../handlers/product');
router.post('/create', createProduct);
router.get('/name', getProduct);
router.get('/all', getAllProducts);
module.exports = router;