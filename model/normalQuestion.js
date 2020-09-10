const mongoose = require('mongoose');

const normalQuestion = mongoose.Schema(
  {
    question: String,
    multipleChoice: Array,
    answer: Number,
  },
  {collection: 'normalQuestions'}
);

module.exports = mongoose.model('normalQuestion', normalQuestion);
