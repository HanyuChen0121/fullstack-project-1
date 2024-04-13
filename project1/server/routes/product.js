const express = require('express');
const router = express.Router();
const { createProduct } = require('../handlers/product');
const { getProduct } = require('../handlers/product');
const { getAllProducts } = require('../handlers/product');

router.post('/create', createProduct);
router.get('/name/:id', getProduct);
router.get('/all', getAllProducts);

module.exports = router;
