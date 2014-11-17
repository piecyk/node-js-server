module.exports = {
    "env": {
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
	"log": "logs/app.log"
    },
    'apiVersion': '/api/v1/'
};
