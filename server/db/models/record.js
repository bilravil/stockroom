module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Record = engine.define('record', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        count: { type: Sequelize.INTEGER },
        in: { type: Sequelize.INTEGER },
        out: { type: Sequelize.INTEGER },
        inDate: {type: Sequelize.DATEONLY},
        outDate: {type: Sequelize.DATEONLY}
    }, {
        freezeTableName: true,
        tableName: 'record',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Record.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Record.create(param).then( record=> { resolve(record); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Record.findOne({ where : { id : param.id}}).then(record=> {
                        if(record !== null){
                            record.update(param).
                            then(function () { resolve(record.get()); }).
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
                    Record.findOne({ where : { id : param.id}}).then( record=> {
                        if(record !== null){
                            param.state = 1;
                            record.update(param).
                            then(function () { resolve(record.get()); }).
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
                        Record.findOne({ where: { id: param.id } }).then( record => { 
                            resolve(record ? record.get() : {});
                            return;
                        })              
                    });
                }

                var query = { raw: true, order: [["id", "ASC"]] };
                if (param.paging != undefined) { query.offset = param.paging.current;
                    query.limit = param.paging.show; }

                if (param.id != undefined && Array.isArray(param.id)) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ id: { $in: param.id } });
                }


                if (param.material != undefined) {
                    query.include = query.include || [];
                    var q = { model: db.material, as: 'material' }
                    if (param.material.id != undefined) {
                        q.where = q.where || {}; q.where.$and = q.where.$and || [];
                        q.where.$and.push({ id: param.material.id });

                    }
                    query.include.push(q);
                }


                return Record.FindAllSend(query);

            }
        }
    });   

    Record.belongsTo(db.material, { foreignKey: 'idMaterial' });
    
    return Record;
}