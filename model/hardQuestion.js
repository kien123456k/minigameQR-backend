const mongoose = require('mongoose');

const hardQuestion = mongoose.Schema({
  question: String,
  multipleChoice: Array,
  answer: Number,
});

module.exports = mongoose.model('hardQuestion', hardQuestion);
