var crypto = require('crypto');
var User = require('../models/User').User;
var app = require('../server');
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
            res.json('dublicate name')
        }
        req.session.user = user._id;
        res.json('user created');
    })
});

exports.getUser = function(id) {
    return User.findOne(id)
};

app.post('/login', function(req, res, next) {
    if (req.session.user) return res.redirect('/');

    var userData = req.body;
    User.findOne({username: userData.name}, function(err, user){
        if(err) return console.error(err);
        if ( user.password == hash(userData.password) ){
            req.session.user = {id: user._id};
            res.redirect('/user');
        } else {
            console.log('Pass wrong');
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