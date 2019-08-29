const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookie = require('cookie');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const mongoose = require("mongoose");

global.WEB_URL = 'http://localhost:3000'

const connetMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/social', { useNewUrlParser: true });
    console.log('connect successful ! ');
  } catch (error) {
    console.error('connect MongoDb has error: ' + error);
  }
};

connetMongoDB();

const sessionMiddleware = async function(req, res, next) {
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log('session', cookies);

  const token = cookies['session-token']

  const user = token.decode;

  req.user = user

  next();
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionMiddleware)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
