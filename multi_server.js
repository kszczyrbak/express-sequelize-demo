const cluster = require('cluster')
var bodyParser = require('body-parser')

if (cluster.isMaster) {
    // Count the machine's CPUs
    let cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

} else {
    const express = require('express');
    const app = express();
    const PORT = 8080;

    const routes = require('./routes')

    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json())
    app.use('/', routes)

    app.listen(PORT, () => {
        console.log(`Server running at: http://localhost:${PORT}/`);
    });
}