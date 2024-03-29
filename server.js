// load the env consts
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');


const indexRouter = require('./routes/index');
const customerRouter = require('./routes/customers');
const homepageRouter = require('./routes/homepage');
const projectRouter = require('./routes/projects');
// const projectRouter = require('./routes/projects');


// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  console.log('Request URL:', req.originalUrl)
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/customers', customerRouter);
app.use('/',homepageRouter)
app.use('/projects', projectRouter);
// app.use('/projects, projectRouter');


// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that! 404 Error');
});

module.exports = app;
