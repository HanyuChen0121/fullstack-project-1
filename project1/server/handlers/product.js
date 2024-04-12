const db = require('../models');

exports.createProduct = async function (req, res, next) {
  try {
    // Create a new product using data from the request body
    let product = await db.Product.create(req.body);

    // Return the newly created product in the response
    return res.status(201).json({ success: true, data: product });
  } catch (err) {
    // Handle errors gracefully
    console.error('Error creating product:', err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

exports.getProduct = async function (req, res, next) {
  try {

        const product = await db.Product.findOne({ productName: req.body.productName}); 
        return res.status(200).json(products);

    } catch (err) {
      
      return res.status(400).send(err.message);
    }
}
exports.getAllProducts = async function (req, res, next) {
  try {
        const products = await db.Product.find(); 
        if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
        }
        return res.status(200).json(products);

    } catch (err) {
      
      return res.status(400).send(err.message);
    }
}
