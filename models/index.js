var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var db = {};

//Create a Sequelize connection to the database using the URL in config/config.js
var sequelize = new Sequelize("postgres://postgres:postgres@db:5432/postgres", {
    define: {
        timestamps: false
    },
    logging: false,
    pool: {
        max: 100,
        min: 100,
        acquire: 30000,
        idle: 10000
    }
});

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;