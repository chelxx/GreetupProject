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

mongoose.connect('mongodb://localhost/Greetup');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "First Name is required!"], 
        minlength: [2, "First Name must be longer than 2 characters!"],
        validate: {
            validator: function(fname){
                return /^[a-z ,.'-]+$/i.test(name);
            },
            message: "First Name cannot contain any special characters!"
        }
    },
    email: { 
        type: String, 
        required: [true, "Email Address is required!"],
        unique: [true, "Email already exists!"], 
        validate: {
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: "Invalid Email Address!"
        }
    },
    password: { 
        type:String, 
        required: [true, "Password is required!"], 
        minlength: [8, "Password must be longer than 8 characters!"], 
        maxlength: [32, "Password cannot be longer than 32 characters!"],
        validate: {
            validator: function(pw){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(pw);
            },
            message: "Password must have at least 1 number, 1 uppercase and 1 special character."
        }
    }
}, {timestamps:true});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash;
        next();
    })
})

// ******************** //
// START OF ROUTES

// REGISTER USER
app.post('/api/registeruser', function (req, res) {
    User.find({email: req.body.email}, function(err,user){
        if(user == 0)
        {
            console.log("user is null!")
            if(req.body.password == req.body.confirm_pw){
                console.log("**passwords:", req.body.password, req.body.confirm_pw); // BOTH ARE UNDEFINED? THE FUCK THO
                console.log("passwords match!");        
                var user = new User ({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                console.log("FORM RESULTS:", req.body.name, req.body.email);
                user.save(function(err){
                    if(err) {
                        console.log("SERVER! USER REGISTRATION ERROR!", err);
                        res.json({message: "Error", error: err});
                    }
                    else {
                        console.log("SERVER! USER REGISTRATION SUCCESS!");
                        res.json({message: "Success"});
                    }
                })
            }
            else {
                console.log("PASSWORDS DO NOT MATCH!");
                res.json({message: "Error!"});
            }
        }
        else {
            console.log("SERVER! USER REGISTRATION SUCCESS!");
            res.json({message: "Success", error: err});
        }
    })
})

// LOGIN USER
app.post('/api/loginuser', function (req, res) {
    User.findOne({email: req.body.loginemail}).exec(function(err, user){
        console.log(req.body.loginemail);
        if(err){
            console.log("SERVER! INVALID EMAIL ADDRESS!");
            res.json({message: "Success", error: err});
        }
        if(user == null) {
            console.log("SERVER! EMAIL ADDRESS DOES NOT EXIST!");
            res.json({message: "Success", error: err});
        }
        else {
            console.log("SERVER! VALID EMAIL ADDRESS!");
            console.log(req.body.loginpassword, user.password);
            bcrypt.compare(req.body.loginpassword, user.password).then(results => {
                if(results == true)
                {
                    console.log("SERVER! PASSWORD LOGIN SUCCESS!");
                    res.json({message: "Success", error: err});
                }
                else {
                    console.log("SERVER! PASSWORD LOGIN ERROR!");
                    res.json({message: "Error", error: err});
                }
            })
            .catch(err =>  {
                console.log("SERVER! INCORRECT PASSWORD!");
                res.json({message: "Error", error: err});
            })
        }
    })
})

// LOGOUT USER
app.post('/api/logout', function (req, res) {
    // NEEDS WORK!!!!
})

// END OF ROUTES
// ******************** //

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});