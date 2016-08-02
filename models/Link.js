var mongoose = require('../db/mongoose');

var schema = new mongoose.Schema({
    link : {
        type: String,
        required: true,
        unique: true
    },
    direct : {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    follows:{
        type: Number
    },
    created_by:{
        type: String,
        required: true
    }
});

exports.Link = mongoose.model('Link', schema);