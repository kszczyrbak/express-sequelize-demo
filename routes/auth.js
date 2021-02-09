const auth = require('express').Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { User } = require('../models')


const hash = (password) => {
    return crypto.createHash('md5').update(password).digest('hex')
}

auth.post('/login', (req, res) => {
    const { username, password } = req.body
    if (!(username !== "" && password != ""))
        return new Error('Invalid username or password')

    const test_hash = hash(password)
    const user = User.findOne({ where: { username: username, password: test_hash } })
    if (user) {
        let token = jwt.sign({
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET, { expiresIn: 129600 }
        )
        res.json({
            "token": token
        })
    }
})

auth.post('/signup', (req, res) => {
    const { username, password } = req.body
    if (!(username !== "" && password != ""))
        return new Error('Invalid username or password')

    let userBody = req.body

    let hashed_password = hash(password)
    userBody.username = username
    userBody.password = hashed_password

    User.create(userBody).then(
        user => {
            let { username, password, ...insenstiveBody } = user
            return res.status(200).json(insenstiveBody)
        }
    ).catch(err => res.status(400).json(err))
})

module.exports = auth