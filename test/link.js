var mongoose = require("mongoose");
var Link = require('../controllers/LinkController');

//Подключаем dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

//Наш основной блок
describe('/GET links', function(){
    it('it should GET all the links', function(done){
        chai.request(server).get('/linkslist').end(function(err, res){
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

describe('/POST link', function(){
    it('it should not POST a link by not authorized user', function(done){
        var link = {
            description: "Link Dscr",
            direct: 'http://google.com'
        };
        chai.request(server)
            .post('/createLink')
            .send(link)
            .end(function(err, res){
                res.should.have.status(500);
                done();
            });
    });

});

describe('/POST link', function(){
    it('it should update a link by id', function(done){
        var link = {
            description: "Link Dscr",
            _id: '57c465e5684360e11ff50175'
        };
        chai.request(server)
            .post('/updateLink')
            .send(link)
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('description').eql("Link Dscr");
                done();
            });
    });

});