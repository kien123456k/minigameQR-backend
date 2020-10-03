const mongoose = require('mongoose');

const mediumQuestion = mongoose.Schema(
  {
    question: String,
    multipleChoice: Array,
    answer: Number,
  },
  {collection: 'mediumQuestions'}
);

module.exports = mongoose.model('mediumQuestion', mediumQuestion);
