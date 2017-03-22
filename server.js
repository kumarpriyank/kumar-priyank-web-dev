var express = require('express');
var app = express();

// For enabling parsing of request body by node.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


//require ("./test/app.js")(app);

// Server Related Changes for Assignment 4
require("./assignment/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);