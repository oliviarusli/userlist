var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  userName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  emailAddress: String,
  identityNumber: {
    type: String,
    maxlength: 30,
  },
});
