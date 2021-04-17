const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session')

const User = require('./models/user')
const localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(flash);
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}
));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(email, done) {
  console.log('serializeUser');
  done(null, email) 
});

passport.deserializeUser(function(email, done) {
  console.log('deserializeUser');
  User.fetchUserDara(email, done)
});

passport.use(new localStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: true
  },function(req, email, password, done) {
    User.checkUserData(req, email, password, done)
  }
))

app.use('/', indexRouter);

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
