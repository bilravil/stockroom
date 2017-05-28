var Sequelize = require('sequelize');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

var db = {};

var Sequelize = require('sequelize');
var md5 = require('md5');


exports.GetDB = function() { return db; }


exports.Init = function(connection, api,callback) {
    var engine = new Sequelize(connection, { logging: false });

    db.stock = require('./models/stock.js')(engine, api);
    db.property = require('./models/property.js')(engine, api);
    db.material = require('./models/material.js')(engine, api);
    db.stocktaking = require('./models/stocktaking.js')(engine, api);
    db.score = require('./models/score.js')(engine, api);
    db.worker = require('./models/worker.js')(engine, api);
    db.speciality = require('./models/speciality.js')(engine, api);
    db.worker4speciality = require('./models/worker4speciality.js')(engine, api);
    db.task = require('./models/task.js')(engine, api);
    db.salary = require('./models/salary.js')(engine, api);
    db.work = require('./models/work.js')(engine, api);
    
    engine.sync().then(callback);
}


exports.Run = function(connection, api, callback) {
    var router = require('./controllers/index.js')(api);
    exports.Init(connection, api,  function () {
        api.GetExpress().use('/Db',router);
    });

    

    callback = callback || function() {};
    callback(`Db service started`);
}