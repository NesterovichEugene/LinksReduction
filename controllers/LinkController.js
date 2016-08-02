var Link = require('../models/Link').Link;
var app = require('../server');
// Link API

app.post('/createLink', function(req, res, next){
    var linkData = req.body;

    var link = new Link({
        link: 'http://localhost:3000/'+randomString(),
        direct: linkData.direct,
        description: linkData.description,
        created_by: req.session.user.id,
        follows: 0
    });
    link.save(function (err, link) {
        if(err && err.code === 11000) {
            var field = err.message.split('_1')[1];
            field = field.split(' dup key: ')[1];
            field = field.substring(field.indexOf('"')+1, field.lastIndexOf('"')); // returns direct
            var duplicate_link = getLink(field);
            duplicate_link.exec(function (err, link) {
                if(err){
                    console.log(err);
                }
                res.json(link);
            })

        }
        else {
            res.json(link);
        }
    })
});

function getLink(direct){
    var query = Link.findOne({direct: direct});
    return query;
};


function randomString() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var length = 6;
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}