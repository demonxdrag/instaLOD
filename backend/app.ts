var express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const compressor = require('./data/compressor');

const usersRouter = require('./routes/users.ts');
const filesRouter = require('./routes/files.ts');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({ parseNested: true }))

app.use('/users', usersRouter);
app.use('/files', filesRouter);

app.use('/compressor', compressor);
app.use('/uploads', express.static(path.join(__dirname, 'data/uploads/')));

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
});

module.exports = app;
