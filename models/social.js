var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var socialSchema = new Schema({
    title: String,
    icon: String,
    url: String
});

module.exports = mongoose.model('Social', socialSchema);
