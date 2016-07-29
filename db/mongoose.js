var mongoose = require('mongoose');

 mongoose.connect("mongodb://localhost/links-reduction");
//mongoose.connect("mongodb://localhost/test");

module.exports = mongoose;


///home/eugene/mongodb/bin/mongod --dbpath /home/eugene/mongodb/data/db

///mongodb/bin$ mongo