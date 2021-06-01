const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  emails: String,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Saved', savedSchema);
