var mongoose = require('mongoose');

module.exports = userSchema => {
  return mongoose.model('User', userSchema);
};
