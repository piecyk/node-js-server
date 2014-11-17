var logger = require('./../logger');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Flight = (function(from, to) {

    var modelSchema = new Schema({
        id: Number,
        from: String,
        to: String,
        date: Date,
        dateFlight: Date,
        price: Number,
        currency: String
    });

    var self = {};
    self.model = mongoose.model('flights', modelSchema);
    self.findByPriceRange = function(range, ok, fail){
        // TODO: impl
    };

    self.add = function(from, to, date, dateFlight, price) {
        // TODO: impl
        logger.info(from, to, date, dateFlight, price);
    };
    return self;
    
})();

module.exports = Flight;
