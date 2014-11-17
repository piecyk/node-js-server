var expect = require('chai').expect;
//var mongoose = require('mongoose');
var request = require('supertest');

describe('Dumy', function() {
    
    var config = require('./../config');
    var app = require('./../index');
    var agent = request.agent(app);

    var Social = require('./../models/social');
    var Flight = require('./../flight/flight');


    it('should check string', function(){
        expect('dumy').to.be.a('string');
    });

    it('should check number', function(){
        expect(1).to.be.a('number');
    });

    describe('Test ' + config.apiVersion, function() {

        var onetSocial = null;
        beforeEach(function(done){
            //add some test data
            
            Social.add("Onet.pl", "o", "http://onet.pl", function(doc){
                onetSocial = doc;
                Social.add("Wp.pl", "w", "http://wp.pl", function(doc){
                    done();
                });
            });
        });

        it("retrieves by url", function(done){
            Social.findByUrl(onetSocial.url, function(doc){
                expect(doc.url).to.eql('http://onet.pl');
                done();
            });
        });

        afterEach(function(done){
            Social.drop(function() {
                done();
            });
        });

        it('respond with json for socials', function(done) {
            agent
                .get(config.apiVersion +'/socials')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) { throw err; }
                    
                    var social = res.body[0];
                    expect(social.title).to.be.a('string');
                    expect(social.url).to.eql(onetSocial.url);
                    done();
                });
        });

        it('respond with json for flights', function(done) {
            agent
                .get(config.apiVersion +'/flights')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) { throw err; }
                    
                    expect(res.body).to.eql([]);
                    done();
                });
        });
    });

});
