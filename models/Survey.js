const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
  email: String,
  responded: {type: Boolean, default: false},
});

const surveySchema = new mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  dateSent: Date,
  lastResponded: Date,
});

module.exports = mongoose.model('Survey', surveySchema);
