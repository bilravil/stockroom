var Sequelize = require('sequelize');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

var db = {};

var Sequelize = require('sequelize');
var md5 = require('md5');


exports.GetDB = function() { return db; }


exports.Init = function(connection, api,callback) {
    var engine = new Sequelize(connection, { logging: false });

    db.patient = require('./models/patient.js')(engine, api);
    db.service = require('./models/service.js')(engine, api);
    db.research = require('./models/research.js')(engine, api);
    
 /* db.speciality = require('./speciality.js')(engine, url, api, jsonParser);
    db.doctor = require('./doctor.js')(engine, url, api, jsonParser);
    db.role = require('./role.js')(engine, url, api, jsonParser);
    
    db.auth = require('./auth.js')(engine, url, api, jsonParser);
    db.servicecode = require('./servicecode.js')(engine, url, api, jsonParser);
    db.test = require('./test.js')(engine, url, api, jsonParser);
*/
    
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