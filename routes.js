
var logger = require('./logger');

var express = require('express');
var router = express.Router();

var Social = require('./models/social');
var Flight = require('./flight/flight');

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

router.route('/flights').get(function(req, res) {
    Flight.model.find(function(err, flights) {
        if (err) {
            logger.error(err);
            return res.send(err);
        }
        return res.json(flights);
    });
});


exports = module.exports = router;
