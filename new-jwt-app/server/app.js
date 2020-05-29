require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');
var modules = require('./routes/modules');
var modules_categories = require('./routes/modules');
var quizzes = require('./routes/quizzes');

var cors = require('cors')
var mysql      = require('mysql');
var config = require('./db/config.js');
var app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection(config);
  res.locals.connection.connect();
  next();
});
app.use('/', index);
app.use('/api/users', users);
app.use('/api/modules', modules);
app.use('/api/modules/categories', modules_categories);
app.use('/api/quizzes', quizzes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var server = http.createServer(app);
server.listen(4000, () => {
  console.log('listening on port 4000');
});
