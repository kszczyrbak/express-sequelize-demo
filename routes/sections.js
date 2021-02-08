const sections = require('express').Router();

const {
    Section
} = require('../models')

// COLLECTION

sections.get('/', (req, res) => {
    Section.findAll().then(
        sections => res.status(200).json(sections)
    )
})

sections.post('/', (req, res) => {
    Section.create(req.body)
        .then(section => res.status(200).json(section))
        .catch(err => res.status(400).json(err))
})

sections.get('/:section_id', (req, res) => {
    Section.findByPk(req.params.section_id).then(section => {
        res.status(200).json(section)
    });
});

sections.put('/:section_id', (req, res) => {
    Section.update(req.body, {
        where: {
            id: req.params.section_id
        }
    }).then(
        data => res.status(204)
    ).catch(err => res.status(400).json(err))
});

sections.delete('/:section_id', (req, res) => {
    Section.destroy({
        where: {
            id: req.params.section_id
        }
    }).then(
        (msg) => res.status(204).json(msg)
    ).catch(err => res.status(400).json(err))
})

sections.get('/:section_id/threads', (req, res) => {
    Section.findByPk(req.params.section_id).then(section => {
        section.getThreads().then(
            threads => res.status(200).json(threads)
        )
    });
});


module.exports = sections;