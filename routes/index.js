const routes = require('express').Router();
const users = require('./users');
const threads = require('./threads');
const sections = require('./sections');
const posts = require('./posts');
const hello = require('./hello');
const auth = require('./auth')

routes.use('/users', users);
routes.use('/threads', threads);
routes.use('/sections', sections);
routes.use('/posts', posts);
routes.use('/hello', hello);
routes.use('/', auth)

routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Connected!'
    });
});

module.exports = routes;