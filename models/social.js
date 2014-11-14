var Social = function() {

    var self = {};
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;
    var socialSchema = new Schema({
        id: Number,
        title: String,
        icon: String,
        url: {type : String, index: { unique: true, required : true } }
    });

    self.model = mongoose.model('socials', socialSchema);
    self.findByUrl = function(url, ok, fail){
        self.model.findOne({ url:url}, function(e, doc){
            if(e){
                fail(e);
            } else {
                ok(doc);
            }
        });
    };
    self.add = function(title, icon, url, ok, fail) {
        var obj = new self.model({
            "title": title,
            "icon": icon,
            "url": url
        });
        // Saving it to the database.
        obj.save(function(err, doc) {
            if (err) {
                console.log(err);
                return fail(err);
            } else {
                return ok(doc);
            }
        });
    };
    return self;
}();

module.exports = Social;
