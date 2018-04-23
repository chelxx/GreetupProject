var bcrypt = require("bcrypt-as-promised");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var socket = require('socket.io');
var express = require("express");
var path = require("path");

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static( __dirname + '/client/dist' ));
app.set("views", path.join(__dirname, "./views"));

mongoose.connect('mongodb://localhost/SchemaName');

var Schema = mongoose.Schema;

var NameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must have more than 3 characters!"]
    }
}, {timestamps:true});

mongoose.model('Name', NameSchema);
var Name = mongoose.model('Name');
// ******************** //
// START OF ROUTES

// END OF ROUTES
// ******************** //
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});
// ******************** //
var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});