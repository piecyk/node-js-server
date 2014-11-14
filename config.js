module.exports = {
    "app": {
        "development": {
            db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/db',
            port: 5000
        },
        "test": {
            db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/testdb',
            port: 8888
        }
    },
    "logger": {
	"api": "logs/api.log",
	"exception": "logs/exceptions.log"
    },
    'apiVersion': '/api/v1/'
};
