const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://fcode:suprlBrlI5e4njCu@cluster0.pihma.mongodb.net/minigame?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log(`connected`);
});

const tokenRouter = require('./routes/token');
const userRouter = require('./routes/user');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/api/', tokenRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Not found'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
//fcode - suprlBrlI5e4njCu 
module.exports = app;
