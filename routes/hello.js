const hello = require('express').Router();

hello.get('/', (req, res) => {
    res.send("Hello World")
})

module.exports = hello;