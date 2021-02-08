const users = require('express').Router();

const {
    User,
    Thread
} = require('../models')

users.get('/', (req, res) => {
    User.findAll().then(
        users => res.status(200).json(users)
    )
})

users.get('/:user_id', (req, res) => {
    User.findByPk(req.params.user_id).then(user => {
        res.status(200).json(user)
    });
});

users.get('/:user_id/threads', (req, res) => {
    User.findByPk(req.params.user_id).then(user => {
        user.getThreads().then(
            threads => res.status(200).json(threads)
        )
    });
});

users.get('/:user_id/posts', (req, res) => {
    User.findByPk(req.params.user_id).then(user => {
        user.getPosts().then(
            posts => res.status(200).json(posts)
        )
    });
});

users.get('/:user_id/followed_threads', (req, res) => {
    User.findByPk(req.params.user_id).then(user => {
        user.getFollowedThreads().then(
            threads => res.status(200).json(threads)
        )
    });
});


module.exports = users;