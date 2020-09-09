const mongoose = require('mongoose');

const result = mongoose.Schema({
  token: String,
  name: String,
  studentID: String,
  score: Number,
  time: Date,
  questions: Array, 
});

module.exports = mongoose.model('result', result);
