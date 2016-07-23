var express = require('express');
var app = express();
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
        url: 'mongodb://localhost/sessions'
    })
}));

var UserController = require('./controllers/UserController');

/* Создание пользователя */
app.post('/login', function(req, res, next) {
    if (req.session.user) return res.redirect('/');

    api.checkUser(req.body)
        .then(function(user){
            if(user){
                req.session.user = {id: user._id, name: user.name}
                res.redirect('/')
            } else {
                return next(error)
            }
        })
        .catch(function(error){
            return next(error)
        })

});

app.post('/signup', function(req, res, next){
    var user = UserController.createUser(req.body);
    console.log(user);
    if(user) res.json('user created');
    else res.json('duplicate name');
});

app.post('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.redirect('/')
    }
});

app.listen(3000);