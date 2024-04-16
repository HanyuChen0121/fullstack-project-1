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

exports.editProduct = async function (req, res, next) {
  try {
    const productId = req.params.id; // Assuming the product ID is passed in the request parameters
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    // Find the product by ID and update its data
    let product = await db.Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Return the updated product in the response
    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    // Handle errors gracefully
    console.error('Error updating product:', err);
    return res.status(400).json({ success: false, error: err.message });
  }
};

exports.getProduct = async function (req, res, next) {
  try {
        const product = await db.Product.findOne({ _id: req.params.id}); 
        return res.status(200).json(product);

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
