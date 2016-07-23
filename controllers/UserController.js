var crypto = require('crypto');
var User = require('../models/User').User;

// User API

exports.createUser = function(userData){
    var user = new User({
        username: userData.name,
        password: hash(userData.password)
    });
    user.save(function (err, user) {
        if(err) return console.error(err);
        console.log(user._id);
        if(user) return user;
    })
};

exports.getUser = function(id) {
    return User.findOne(id)
};

exports.checkUser = function(userData) {
    return User
        .findOne({name: userData.name})
        .then(function(doc){
            if ( doc.password == hash(userData.password) ){
                console.log("User password is ok");
                return Promise.resolve(doc)
            } else {
                return Promise.reject("Error wrong")
            }
        })
};

function hash(text) {
    return crypto.createHash('sha1')
        .update(text).digest('base64')
}