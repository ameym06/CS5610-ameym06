/*
    Author : Amey Maslekar
    File   : server.js
    Details: Configuration script for 'soundbytes'.
    Email  : ameym06@ccs.neu.edu
*/

var express       = require("express");
var bodyParser    = require("body-parser");
var multer        = require("multer");
var passport      = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var cookieParser  = require("cookie-parser");
var session       = require("express-session");
var mongoose      = require("mongoose");
var app           = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(session(
    {
        secret           : "SoundBytes"
    }
));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));

/* Set the environment variables we need */
var ip      = process.env.OPENSHIFT_NODEJS_IP      || '127.0.0.1';
var port    = process.env.OPENSHIFT_NODEJS_PORT    || 3000;
var connStr = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';

/* Connect to MongoDB instance */
var db = mongoose.connect(connStr);

/*-----------------------------------INITIAL SETUP-----------------------------------*/

/* User Schema */
var UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName: String,
    lastName : String,
}, {collection: "user"});

/* Model */
var UserModel = mongoose.model("UserModel", UserSchema);



/* User Schema */
var BlogSchema = new mongoose.Schema({
    username : String,
    title : String,
    content: String,
    date : Date,
}, {collection: "myBlogs"});

/* Model */
var BlogModel = mongoose.model("BlogModel", BlogSchema);

/* Set up passport : BEGIN */
passport.use(new LocalStrategy(
function(username, password, done)
{
    UserModel.findOne({username: username, password: password}, function(err, user)
    {
        if(user)
        {
            return done(null,
            {
                _id      : user._id,
                username : user.username,
                firstName: user.firstName,
                lastName : user.lastName,
            });
        }
        return done(null, false, {message: "  [error] Unable to login"});
    });
}));

passport.serializeUser(function(user, done)
{
    done(null, user);
});

passport.deserializeUser(function(user, done)
{
    done(null, user);
});

var auth = function(req, res, next)
{
    if(!req.isAuthenticated())
    {
        res.send(401);
    }
    else
    {
        next();
    }
};
/* Set up passport : END */

//POST requests begin

app.post("/api/login", passport.authenticate("local"), function(req, res)
{	
	
    var user = req.user;
    res.json(user);
    
});

app.post("/api/signup", function(req, res) {
	var newUser = req.body;
    UserModel.findOne({username: newUser.username}, function(err, user) {
    		if(user){
	            res.json({returnCode:1});
	    	}
	        else{
	        	var user = new UserModel(req.body);
	            user.save();
	            res.json({returnCode:0});
	        }
	    });
    	
});

app.post("/api/blog/", function(req, res){
	var newBlog = new BlogModel(req.body);
	newBlog.save();
	res.json({returnCode:0});
	
}); 

//POST requests end

//GET requests begin

app.get("/api/profile/:uid",function(req,res){
	var uid = req.params.uid;
	BlogModel.find({username: uid}, function(err, docs){
		console.log(docs);
		res.send(docs);
	})
	
});

//GET requests end

//Server listening to port NodeJS Port on Openshift
//Or port 3000 on localhost

app.listen(port, ip);