// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// configuration ===============================================================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/policia_federal'); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // these two get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// required for passport
app.use(session({
    secret: 'agespoliciafederal',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/users')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/ocorrencias')(app);

// launch ======================================================================
app.listen(port);
console.log('Acesse localhost:' + port);