const mongoose = require('mongoose');

const hardQuestion = mongoose.Schema(
  {
    question: String,
    multipleChoice: Array,
    answer: Number,
  },
  {collection: 'hardQuestions'}
);

module.exports = mongoose.model('hardQuestion', hardQuestion);
