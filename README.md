# node-js-server

running on [https://safe-lowlands-9308.herokuapp.com])(https://safe-lowlands-9308.herokuapp.com/).
test api on [https://safe-lowlands-9308.herokuapp.com/api/v1/socials])(https://safe-lowlands-9308.herokuapp.com/api/v1/socials/).

A barebones Node.js app using [Express 4](http://expressjs.com/).


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) mongodb.
for heroku the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:piecyk/node-js-server.git # or clone your own fork
$ cd node-js-server
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ heroku addons:add mongolab
$ git push heroku master
$ heroku open
```

and then:
[localhost:5000](http://localhost:5000/mock) - to mock data
[localhost:5000](http://localhost:5000/api/v1/socials) - to see the result

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
