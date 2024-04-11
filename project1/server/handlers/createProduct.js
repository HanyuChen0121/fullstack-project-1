const db = require('../models');

exports.createProduct = async function (req, res, next) {
    try {
    
        let product = await db.Product.create(req.body);


      } catch (err) {
        
        return res.status(400).send(err.message);
      }
}