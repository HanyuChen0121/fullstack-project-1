const express = require('express');
const router = express.Router();
const { createProduct } = require('../handlers/product');

router.post('/', createProduct);

module.exports = router;