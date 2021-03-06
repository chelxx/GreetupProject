var bcrypt = require("bcrypt");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var socket = require('socket.io');
var express = require("express");
var path = require("path");

//socket chat
var router = express.Router();
var debug = require('debug')('angular2-nodejs:server');
var http = require('http');

var app = express();

app.use(session({ secret: 'luvumichaelchoi' }));

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
        required: [true, "Name is required!"], 
        minlength: [2, "Name must be longer than 2 characters!"],
        validate: {
            validator: function(name){
                return /^\s*[a-zA-Z,\s]+\s*$/.test(name);
            },
            message: "Name cannot contain any special characters!"
        }
    },
    email: { 
        type: String, 
        required: [true, "Email Address is required!"],
        unique: [true, "Email already exists!"], 
        validate: {
            validator: function(email){
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
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
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(pw);
            },
            message: "Password must have at least 1 number, 1 uppercase and 1 lowercase."
        }
    }
}, {timestamps:true});

var EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Events must have a name."],
        minlength: [3, "Event names must be at least 3 characters long."]
    },
    description: {
        type: String,
        required: [true, "Describe this Event!"],
        minlength: [3, "Please describe this event in at least 3 characters."]
    },
    street: {
        type: String,
        required: [true, "Please include the street for this event."],
        minlength: [3, "Street address must be at least 3 characters long."]
    },
    city: {
        type: String,
        required: [true, "Please include the city for this event."],
        minlength: [3, "City must be at least 3 characters long."]
    },
    state: {
        type: String,
        required: [true, "Please include the state for this event."],
        minlength: [2, "Please include a valid state."]
    },
    zip: {
        type: Number,
        required: [true, "Please include a zip code!"],
        minlength: [5, "Please include a valid zip code."]
    },
    date: {
        type: Date,
        required:[true,"Let attendees know when this event is taking place!"],
        default: Date.now
    },
    // time: {
    //     type: Date,
    //     required: [true, "Please include an event time!"]
    // },
    likes: {
        type: Number,
        default: 0
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
}, { timestamps: true })

var ChatSchema = new mongoose.Schema({
    room: String,
    nickname: String,
    message: String,
    updated_at: { type: Date, default: Date.now },
});

mongoose.model('Chat', ChatSchema);
var Chat = mongoose.model('Chat');

mongoose.model('Event', EventSchema) // We are setting this Schema in our Models as 'User'
var Event = mongoose.model('Event')

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash;
        next();
    })
})

// ******************** //
// START OF LOGIN/REG ROUTES

// REGISTER USER
app.post('/api/registeruser', function (req, res) {
    User.find({email: req.body.email}, function(err,user){
        if(user == 0)
        {
            console.log("SERVER! USER IS NULL!")
            if(req.body.password == req.body.confirm_pw){
                console.log("FORM PASSWORDS:", req.body.password, req.body.confirm_pw);
                console.log("SERVER! PASSWORDS MATCH!");        
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
                        req.session.userID = user._id;
                        req.session.name = user.name;
                        console.log("REGISTER! CURRENT USERID AND NAME:", req.session.userID, req.session.name);
                        res.json({message: "Success", sessionName: req.session.name, sessionUserID: req.session.userID});
                    }
                })
            }
            else {
                console.log("PASSWORDS DO NOT MATCH!");
                res.json({message: "Passwords do not match!"});
            }
        }
        else {
            console.log("SERVER! USER REGISTRATION ERROR!");
            res.json({message: "Email already exists!", error: err});
        }
    })
})

// LOGIN USER
app.post('/api/loginuser', function (req, res) {
    User.findOne({email: req.body.loginemail }).exec(function(err, user){
        console.log("LOGIN BODY:", req.body );        
        console.log("LOGIN EMAIL:", req.body.loginemail );
        if(err){
            console.log("SERVER! LOGIN INVALID EMAIL ADDRESS!");
            res.json({message: "Error", error: err});
        }
        if(user == null) {
            console.log("SERVER! LOGIN EMAIL ADDRESS DOES NOT EXIST!");
            res.json({message: "Error", error: err});
        }
        else {
            console.log("SERVER! VALID LOGIN EMAIL ADDRESS!");
            console.log("PASSWORDS:", req.body.loginpassword, user.password);
            bcrypt.compare(req.body.loginpassword, user.password).then(results => {
                if(results == true)
                {
                    console.log(results);
                    console.log("SERVER! PASSWORD LOGIN SUCCESS!");
                    req.session.userID = user._id;
                    req.session.name = user.name;
                    console.log("LOGIN! CURRENT USERID AND NAME:", req.session.userID, req.session.name);
                    res.json({message: "Success", error: err, sessionName: req.session.name, sessionUserID: req.session.userID});
                }
                else {
                    console.log("SERVER! PASSWORD LOGIN ERROR!");
                    res.json({message: "Error", error: err});
                }
            })
            .catch(err =>  {
                console.log("SERVER! INCORRECT LOGIN PASSWORD!");
                res.json({message: "Incorrect Password. Try again!", error: err});
            })
        }
    })
})

// LOGOUT USER - NEEDS WORK!!!
app.post('/api/logout', function (req, res) {
    console.log("DESTROYING SESSION! LOGGING OUT!", req.session)
    req.session.destroy();
    res.json({message: "Success"});
})

// END OF LOGIN/REG ROUTES
// ******************** //
// START OF CRUD EVENT ROUTES

// 1. Get all events : filtered for current events
app.get('/events', function (req, res) {
    var today = new Date();
    today.setDate = Date.now;
    Event.find({date: {$gte: today}}).sort({ date:1 }).exec( function (err, events) {
        if (err) {
            console.log("Returned Error", err);
            res.json({ error: err })
        }
        else {
            res.json({ events: events })
        }
    });
})

// 2. Retrieves event by ID
app.get('/api/viewEvent/:id', function (req, res) {
    Event.findOne({ _id: req.params.id }, function (err, event) {
        if (err) {
            res.json({message: "Error!", error: err })
        }
        else {
            res.json({message: "Success!", event: event })
        }
    })

})

// 3. Creates an event
app.post('/api/events', function (req, res) {
    var event = new Event({ name: req.body.name, description: req.body.description, street: req.body.street, city: req.body.city, state: req.body.state, zip: req.body.zip, date: req.body.date, lat: req.body.lat, lng: req.body.lng})
    console.log("HELLO FROM EVENTS ")
    event.save(function (err) {
        if (err) {
            console.log("in Server.js file")
            res.json({ message: "Please choose another name, we already have an event with that one!",error: err })

        }
        else {
            res.json({ message: "Success!" })
        }
    })

})

// 4. Update event by ID
app.put('/api/editEvent/:id/', function (req, res) {
    Event.findByIdAndUpdate({_id: req.params.id},
    req.body, {new: true}, function(err, event){
        if(err){
            res.json({message: "error", error: err})
        }
        else{
            res.json({message: "Success!", event: event})
        }
    })
 
    })

// 5. Delete event by ID
app.delete('/api/deleteEvent/:id', function (req, res) {
    Event.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.json({ error: err })
        }
        else {
            res.json({message: "successful delete back"})
        }
    })

})

// END OF CRUD EVENT ROUTES
// ******************** //

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

// ******************** //

var server = app.listen(6789, function() {
    console.log("Listening on port 6789!");
});

// ******************** //

var io = require('socket.io').listen(server);

io.on('connection',(socket)=>{
    console.log('new connection made.');

    socket.on('join', function(data){
        //joining
        socket.join(data.room);
        console.log(data.user + 'joined the room : ' + data.room);
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });

    socket.on('leave', function(data){
        console.log(data.user + 'left the room : ' + data.room);
        socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
        socket.leave(data.room);
    });

    socket.on('message',function(data){
        if(socket.rooms.hasOwnProperty(data.room)){
            io.in(data.room).emit('new message', {user:data.user, message:data.message});
        }
    })
});