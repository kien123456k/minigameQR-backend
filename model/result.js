const mongoose = require('mongoose');

const result = mongoose.Schema({
  token: String,
  name: String,
  studentID: String,
  score: Number,
  timeStart: Date,
  timeEnd: Date,
  time: Number,
});

module.exports = mongoose.model('result', result);
