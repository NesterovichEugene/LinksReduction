var Tag = require('../models/Tag').Tag;
var Link = require('../models/Link').Link;
var async = require('async');
var app = require('../server');
// Link API

app.post('/createTag', function(req, res, next){
    var tags = req.body.tag;
    Link.findOne({direct: req.body.direct}, function(err, link){
        var exist_tag = getTags(link._id);
        exist_tag.exec(function (err, exist_tags) {
            if(exist_tags.length < 1){
                for(tag_index in tags){
                    var tag = new Tag({
                        name: tags[tag_index],
                        link_id: link._id
                    });
                    tag.save();
                }
                res.json(tags);
            }
            else res.json(tags);
        })
    });
});

app.post('/getTags', function(req, res){
    Tag.find({link_id: req.body._id}, function(err, data){
        if(err){
            console.log(err)
        }
        else{
            res.json(data)
        }
    })
});

app.post('/updateTags', function(req, res){
    var tags = req.body;
    async.each(tags, function(tag, callback){
        Tag.findOne({_id: tag._id}, function(err, getTag){
            if(err){
                console.log(err);
            }
            else{
                getTag.name = tag.name;
                getTag.save();
                callback();
            }
        })
    }, function (err) {
        res.send('success');
    });
});

app.post('/viewTag', function(req, res){
    Tag.find({name: req.body.name}, function(err, tags){
        if(err){
            console.log(err);
        }
        else{
            var links = [];
            async.each(tags, function(tag, callback){
                Link.findOne({_id: tag.link_id}, function(err, link){
                    if(err){
                        console.log(err);
                    }
                    else{
                        links = links.concat(link);
                        callback();
                    }
                })
            }, function (err) {
                res.json(links);
                links = [];
            });
        }
    })
});

function getTags(link_id){
    var query = Tag.find({link_id: link_id});
    return query;
};

