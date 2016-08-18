var express = require('express');
var app = module.exports  = express();
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/web"));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'i need more beers',
    resave: false,
    saveUninitialized: false,
    // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
    store: new MongoStore({
        url: 'mongodb://localhost/links-reduction'
    })
}));

var UserController = require('./controllers/UserController');
var LinkController = require('./controllers/LinkController');
var TagController = require('./controllers/TagController');

app.get('/', function(req, res){
    if (req.session.user){
        res.redirect('/user');
    }
    else{
        res.sendFile(__dirname+'/views/index.html');
    }
});

app.get('/user', function(req, res){
    if (req.session.user){
        res.sendFile(__dirname+'/views/user.html');
    }
    else{
        res.redirect('/');
    }
});

app.listen(3000);

