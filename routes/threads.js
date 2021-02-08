const threads = require('express').Router();

const {
    Thread
} = require('../models')

// COLLECTION

threads.get('/', (req, res) => {
    Thread.findAll().then(
        threads => res.status(200).json(threads)
    )
})

threads.post('/', (req, res) => {
    Thread.create(req.body)
        .then(thread => res.status(200).json(thread))
        .catch(err => res.status(400).json(err))
})

// ITEM

threads.get('/:thread_id', (req, res) => {
    Thread.findByPk(req.params.thread_id).then(thread => {
        res.status(200).json(thread)
    });
});

threads.put('/:thread_id', (req, res) => {
    Thread.update(req.body, {
        where: {
            id: req.params.thread_id
        }
    }).then(
        data => res.status(204)
    ).catch(err => res.status(400).json(err))
});

threads.delete('/:thread_id', (req, res) => {
    Thread.destroy({
        where: {
            id: req.params.thread_id
        }
    }).then(
        (msg) => res.status(204).json(msg)
    ).catch(err => res.status(400).json(err))
})

threads.get('/:thread_id/posts', (req, res) => {
    Thread.findByPk(req.params.thread_id).then(thread => {
        thread.getPosts().then(
            posts => res.status(200).json(posts)
        )
    });
});

threads.get('/:thread_id/followers', (req, res) => {
    Thread.findByPk(req.params.thread_id).then(thread => {
        thread.getFollowers().then(
            followers => res.status(200).json(followers)
        )
    });
});



module.exports = threads;