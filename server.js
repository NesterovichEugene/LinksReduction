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

/* Создание пользователя */


app.post('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.redirect('/')
    }
});

app.listen(3000);

