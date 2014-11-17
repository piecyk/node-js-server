var logger = require('./../logger');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var Social = (function() {

    var modelSchema = new Schema({
        id: Number,
        title: String,
        icon: String,
        url: {type : String, index: { unique: true, required : true } }
    });

    var self = {};
    self.model = mongoose.model('socials', modelSchema);
    self.drop = function(ok) {
        self.model.remove({}, function() {
            ok();
        });
    };
    self.findByUrl = function(url, ok, fail){
        self.model.findOne({ url:url }, function(e, doc){
            if (e){
                fail(e);
            } else {
                ok(doc);
            }
        });
    };
    self.add = function(title, icon, url, ok) {
        var obj = new self.model({
            "title": title,
            "icon": icon,
            "url": url
        });
        
        obj.save(function(err, doc) {
            if (err) {
                logger.error(err);
                throw err;
            } else {
                ok(doc);
            }
        });;
    };
    return self;
})();

module.exports = Social;
