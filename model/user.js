const mongoose = require('mongoose');

const user = mongoose.Schema(
  {
    token: String,
    name: String,
    studentID: String,
    score: Number,
    timeStart: Number,
    timeEnd: Number,
    time: Number,
    questions: Array,
    myAnswers: Array,
  },
  {collection: 'users'}
);

module.exports = mongoose.model('user', user);
