module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Worker = engine.define('worker', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        last: { type: Sequelize.STRING(255), validate : { is: ["^[a-z]+$",'i'] } },
        first: { type: Sequelize.STRING(255), validate : { is: ["^[a-z]+$",'i'] } },
        middle: { type: Sequelize.STRING(255), validate : { is: ["^[a-z]+$",'i'] } },     
        persNum: { type: Sequelize.INTEGER },
        speciality: { type: Sequelize.STRING(255) },
        state : { type: Sequelize.INTEGER,defaultValue : 0 },
    }, {
        freezeTableName: true,
        tableName: 'worker',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Worker.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Worker.create(param).then( worker=> { resolve(worker); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Worker.findOne({ where : { id : param.id}}).then(worker=> {
                        if(worker !== null){
                            worker.update(param).
                            then(function () { resolve(worker.get()); }).
                            error(function (error) { reject(error); });
                        }else  reject( { code : 404 , msg : "" });                      
                      })
                      .catch(function (error){
                        reject({ code : 500 , msg : error });
                      });
                })
            },

            Delete: function(param) {
                return new Promise( (resolve,reject) =>{
                    Worker.findOne({ where : { id : param.id}}).then( worker=> {
                        if(worker !== null){
                            param.state = 1;
                            worker.update(param).
                            then(function () { resolve(worker.get()); }).
                            error(function (error) { reject(error); });
                        }else  reject( { code : 404 , msg : "" });                      
                      })
                      .catch(function (error){
                        reject({ code : 500 , msg : error });
                      });
                })
            },

            Get: function(param) {

                if (param.id != undefined && !Array.isArray(param.id)) {
                    return new Promise( (resolve,reject) =>{
                        Worker.findOne({ where: { id: param.id } }).then( worker => { 
                            resolve(worker ? worker.get() : {});
                            return;
                        })              
                    });
                }

                var query = { raw: true, order: [["first", "ASC"]] };
                if (param.paging != undefined) { query.offset = param.paging.current;
                    query.limit = param.paging.show; }

                if (param.id != undefined && Array.isArray(param.id)) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ id: { $in: param.id } });
                }

                if (param.persNum != undefined) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ persNum: { $eq: param.persNum } });
                }

                if (param.last != undefined) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ $or: [{ first: { $eq: null } }, { first: { $iLike: "%" + param.first + "%" } }] });
                    query.where.$and.push({ $or: [{ middle: { $eq: null } }, { middle: { $iLike: "%" + param.middle + "%" } }] });
                    query.where.$and.push({ $or: [{ last: { $eq: null } }, { last: { $iLike: "%" + param.last + "%" } }] });

                }

                return Worker.FindAllSend(query);

            }
        }
    });   
    Worker.belongsTo(db.auth, { foreignKey: 'idWAuth' });
    return Worker;
}