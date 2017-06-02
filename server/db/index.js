var Sequelize = require('sequelize');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

var db = {};

var Sequelize = require('sequelize');
var md5 = require('md5');


exports.GetDB = function() { return db; }


exports.Init = function(connection,api,callback) {
    var engine = new Sequelize(connection, { logging: false });

    db.stock = require('./models/stock.js')(engine,api);
    db.property = require('./models/property.js')(engine,api);
    db.material = require('./models/material.js')(engine,api);
    db.record = require('./models/record.js')(engine,api);
    db.task = require('./models/task.js')(engine,api);
    db.score = require('./models/score.js')(engine,api);
    db.role = require('./models/role.js')(engine,api);
    db.auth = require('./models/auth.js')(engine,api);
    db.worker = require('./models/worker.js')(engine,api);
    db.speciality = require('./models/speciality.js')(engine,api);
    db.worker4speciality = require('./models/worker4speciality.js')(engine,api);
    
    db.work = require('./models/work.js')(engine,api);
    
    engine.sync().then(callback);
}


exports.Run = function(connection,api, callback) {
    var router = require('./controllers/index.js')(api);
    exports.Init(connection,api,function () {

        function initRole(callback){
            let param = {name:"admin",rights:{"admin":true}}
            db.role.Create(param).then(res=>callback(res.id));
        }

        function initAuth(uuidRole,callback){
            let param = {login:"admin1",password:"admin",idRole:idRole}
            db.auth.Create(param).then(callback(true));
        }

        //initRole(res=>initAuth(initAuth(res)));

        
        global.api.GetExpress().use('/Db',router);
    });

    

    callback = callback || function() {};
    callback(`Db service started`);
}