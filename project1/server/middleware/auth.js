const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "project";

// make sure we get the correct user - Authorization
exports.ensureCorrectUser = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decoded = await jwt.verify(token, JWT_SECRET_KEY);
    if (decoded) {
      return next();

    } else {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }

  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }
};
