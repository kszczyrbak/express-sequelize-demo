const posts = require('express').Router();

const {
    Post
} = require('../models')

// COLLECTION

posts.get('/', (req, res) => {
    Post.findAll().then(
        posts => res.status(200).json(posts)
    )
})

posts.post('/', (req, res) => {
    Post.create(req.body).then(
        post => res.status(200).json(post)
    ).catch(
        err => res.status(400).json(err)
    )
});

// ITEM

posts.get('/:post_id', (req, res) => {
    Post.findByPk(req.params.post_id).then(post => {
        res.status(200).json(post)
    });
});

posts.put('/:post_id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.post_id
        }
    }).then(
        data => res.status(204)
    ).catch(err => res.status(400).json(err))
});

posts.delete('/:post_id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.post_id
        }
    }).then(
        (msg) => res.status(204).json(msg)
    ).catch(err => res.status(400).json(err))
})



module.exports = posts;