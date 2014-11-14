
var env = process.env.NODE_ENV || 'development';
var config = require('./config');
var envConfig = config.app[env];
var logger = require('./logger');
var mongoose = require("mongoose");

mongoose.connect(envConfig.db, function (err, res) {
    if (err) {
        logger.error('ERROR connecting to: ' + envConfig.db + '. ' + err);
    } else {
        logger.info('Succeeded connected to: ' + envConfig.db);
    }
});

var Social = require('./models/social');

var express = require('express');
var router = express.Router();
var app = express();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
    logger.info('%s %s %s', req.method, req.url, req.path);
    next();
});

router.route('/socials').get(function(req, res) {
    Social.model.find(function(err, socials) {
        if (err) {
            logger.error(err);
            return res.send(err);
        }
        return res.json(socials);
    });
});

app.use(config.apiVersion, router); //This is our route middleware
app.set('port', (process.env.PORT || envConfig.port || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('Hello World!');
});
app.get('/mock', function(request, response) {
    // Creating one user.
    Social.add('Facebook', 'fb', 'http://www.facebook.com/piecu', function() {
        response.send('yeee! you saved!');
    });
});

app.get('/remove', function(request, response) {
    Social.model.remove({}, function() {
        response.send('yeee! removed');
    });
});

app.listen(app.get('port'), function() {
    logger.info("Node app is running at localhost:" + app.get('port'));
});

exports = module.exports = app;
