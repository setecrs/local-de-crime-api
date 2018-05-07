// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3009;
var mongoose = require('mongoose');
var flash = require('connect-flash');

const router = express.Router();
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// configuration ===============================================================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/policia_federal'); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // these two get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// routes ======================================================================
require('./routes/users')(router);
app.use('/api/v1', router);

// launch ======================================================================
app.listen(port);
console.log('Acesse localhost:' + port);
