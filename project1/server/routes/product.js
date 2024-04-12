const express = require('express');
const router = express.Router();
const { createProduct } = require('../handlers/product');
const { getProduct } = require('../handlers/product');
const { getAllProducts } = require('../handlers/product');

router.post('/', createProduct);
router.get('/name', getProduct);
router.get('/all', getAllProducts);

module.exports = router;
