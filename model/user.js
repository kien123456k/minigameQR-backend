const mongoose = require('mongoose');

const user = mongoose.Schema({
  token: String,
  name: String,
  studentID: String,
  score: Number,
  time: Date,
  questions: Array,
});

module.exports = mongoose.model('user', user);
