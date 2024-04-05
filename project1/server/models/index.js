const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.User = require('./user');