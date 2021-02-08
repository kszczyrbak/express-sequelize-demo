var bodyParser = require('body-parser')

const express = require('express');
const app = express();
const PORT = 8000;

const routes = require('./routes')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});
