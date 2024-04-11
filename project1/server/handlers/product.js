const db = require('../models');

exports.createProduct = async function (req, res, next) {
    try {
    
        let product = await db.Product.create(req.body);


      } catch (err) {
        
        return res.status(400).send(err.message);
      }
}

exports.getProduct = async function (req, res, next) {
  try {

        const product = await db.Product.findOne({ productName: req.body.productName}); 
        return res.status(200).json({ product });

    } catch (err) {
      
      return res.status(400).send(err.message);
    }
}
exports.getAllProducts = async function (req, res, next) {
  try {
        const product = await db.Product.find(); 
        if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
        }
        return res.status(200).json({ product });

    } catch (err) {
      
      return res.status(400).send(err.message);
    }
}
