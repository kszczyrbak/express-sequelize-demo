var bodyParser = require('body-parser')

const express = require('express');
const app = express();
const PORT = 8000;
const jwt = require('express-jwt')


// const jwt = require('./middlewares/jwt')

const routes = require('./routes')

const jwtMiddleWare = jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/login', '/signup', '/hello'] })

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(jwtMiddleWare)

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    }
});


app.use('/', routes)



app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});