var winston = require('winston');
var config = require('./config');

// We will log normal api operations into api.log
module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: config.logger.log
        })
    ]
});
