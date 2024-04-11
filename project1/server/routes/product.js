const express = require('express');
const router = express.Router();
const { createProduct, getProduct, getAllProducts } = require('../handlers/product');
router.post('/create', createProduct);
router.get('/name', getProduct);
router.get('/all', getAllProducts);
module.exports = router;