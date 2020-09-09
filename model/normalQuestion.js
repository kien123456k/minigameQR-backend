const mongoose = require('mongoose');

const normalQuestion = mongoose.Schema({
  question: String,
  multipleChoice: Array,
  answer: Number,
});

module.exports = mongoose.model('normalQuestion', normalQuestion);
