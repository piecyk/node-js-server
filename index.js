
var env = process.env.NODE_ENV || 'development';
var config = require('./config');
var logger = require('./logger');
var mongoose = require("mongoose");

var express = require('express');
var app = express();

mongoose.connect(config.env[env].db, function (err, res) {
    if (err) {
        logger.error('ERROR connecting to: ' + config.env[env].db + '. ' + err);
    } else {
        logger.info('Succeeded connected to: ' + config.env[env].db);
    }
});

app.use(config.apiVersion, require('./routes'));
app.set('port', (process.env.PORT || config.env[env].port || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('Hello World!');
});


// TODO: refactor this to server js

var Social = require('./models/social');

app.get('/mock', function(request, response) {
    Social.add('Facebook', 'fb', 'http://www.facebook.com/piecu', function() {
        response.send('yeee! you saved!');
    });
});

app.get('/remove', function(request, response) {
    Social.drop(function() {
        response.send('yeee! removed');
    });
});

app.listen(app.get('port'), function() {
    logger.info("Node app is running at localhost:" + app.get('port'));
});

exports = module.exports = app;
