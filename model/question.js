const mongoose = require('mongoose');

const question = mongoose.Schema({
  question: String,
  multipleChoice: Array,
  answer: String,
});

module.exports = mongoose.model('question', question);
