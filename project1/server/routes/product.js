const express = require('express');
const router = express.Router();
const { createProduct } = require('../handlers/product');
const { getProduct } = require('../handlers/product');
const { getAllProduct } = require('../handlers/product');
router.post('/', createProduct);
router.get('/name', getProduct);
router.get('/all', getAllProduct);
module.exports = router;