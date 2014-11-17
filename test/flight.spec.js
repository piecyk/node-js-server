var expect = require('chai').expect;
//var mongoose = require('mongoose');
//var request = require('supertest');

//var config = require('./../config');
//var app = require('./../index');
//var agent = request.agent(app);

var FlightHandler = require('./../flight/flightHandler');

describe.only('Flight checks', function() {

    it('should check FlightHandler', function(){
        expect(FlightHandler).to.be.a('function');
    });
    
    it.only('should create new FlightHandler', function(done){        
        var flightHandler = new FlightHandler("Rzeszow", "London", new Date());
        flightHandler.check(function() {
            done();
        });
        expect(flightHandler).to.be.a('object');
    });
});
