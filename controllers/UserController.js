var crypto = require('crypto');
var User = require('../models/User').User;
var app = require('../server');
var mongojs = require('mongojs');
// User API

app.post('/signup', function(req, res, next){
    var userData = req.body;

    var user = new User({
        username: userData.name,
        password: hash(userData.password)
    });
    user.save(function (err, user) {
        if(err) {
            console.error(err);
            res.send('dublicate')
        }
        else {
            req.session.user = {id: user._id};
            res.json('user created');
        }
    })
});

app.get('/getUser', function(req, res) {
    User.findOne({_id:  mongojs.ObjectId(req.session.user.id)}, function(err, user){
        res.json(user);
    });
});

app.post('/login', function(req, res, next) {
    if (req.session.user) return res.redirect('/');

    var userData = req.body;
    User.findOne({username: userData.name}, function(err, user){
        if(user === null){
            res.send('not found');
        }
        else if ( user.password == hash(userData.password) ){
            req.session.user = {id: user._id};
            res.redirect('/user');
        } else {
            res.send('wrong pass');
        }
    })
});

app.get('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.redirect('/')
    }
});

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}