const db = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "project";

exports.signin = async function (req, res, next) {
  try {
    // finding a user
    const user = await db.User.findOne({ email: req.body.email });
    const {id, email} = user;

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.password);

    // if it all matches, log them in
    if (isMatch) {
      let token = jwt.sign({id, email}, JWT_SECRET_KEY, { expiresIn: '2h' } );
      
      return res.status(200).json({ id, email, token });

    } else {
      // return res.status(400).send('Invalid Email / Password.');
      return next({ status: 400, message: 'Invalid Email / Password.' });
    }

  } catch (err) {
    return next({ status: 400, message: 'Invalid Email / Password.' });
  }
};

exports.signup = async function (req, res, next) {
  try {
    req.body.type = req.body.type || 'REGULAR';

    let user = await db.User.create(req.body);
    let {id, email} = user;

    let token = jwt.sign({id, email}, JWT_SECRET_KEY, { expiresIn: '2h' } );
    
    return res.status(200).json({ id, email, token });

  } catch (err) {
    // if there is already a user with that email
    if (err.code === 11000) {
      err.message = 'Sorry, this email is taken';
    }
    
    // return next({ status: 400, message: err.message });
    return res.status(400).send(err.message);
  }
};
