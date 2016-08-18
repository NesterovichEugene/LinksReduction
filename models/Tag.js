var mongoose = require('../db/mongoose');

var schema = new mongoose.Schema({
    name : {
        type: String
    },
    link_id : {
        type: String,
        required: true
    }
});

exports.Tag = mongoose.model('Tag', schema);