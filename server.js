var express = require('express');
var app = express();

// For enabling parsing of request body by node.
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure the server to use cookie based session support
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
//secret: process.env.SESSION_SECRET
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true}));

var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


//require ("./test/app.js")(app);

// Server Related Changes for Assignment 4
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);