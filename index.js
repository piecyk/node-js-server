
var mongoose = require ("mongoose");
var dbName = "testdb";
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/' + dbName;

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});
var Social = require('./models/social');

var express = require('express');
var router = express.Router();
var app = express();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

router.route('/socials').get(function(req, res) {
    Social.find(function(err, socials) {
        console.log("found", socials);
        if (err) {
            return res.send(err);
        }
        return res.json(socials);
    });
});

app.use('/api/v1', router); //This is our route middleware
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('Hello World!');
});
app.get('/mock', function(request, response) {
    // Creating one user.
    var fb = new Social({
        "title":"Facebook",
        "icon":"fb",
        "url":"https://www.facebook.com/?segun.konibire"
    });
    // Saving it to the database.  
    fb.save(function (err) {
        if (err) {
            console.log ('Error on save!');
        }
        response.send('yeee!');
    }); 
});
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
