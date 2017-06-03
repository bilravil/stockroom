module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Task = engine.define('task', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        name: { type: Sequelize.STRING(255) },
        number: { type: Sequelize.STRING(30) },
        detailCount: { type: Sequelize.INTEGER  },
        totalTime: { type: Sequelize.INTEGER  },
        salary : {type: Sequelize.INTEGER },
        materialCostPrice: { type: Sequelize.INTEGER  },
        startDate: { type: Sequelize.DATEONLY  },
        endDate: { type: Sequelize.DATEONLY  },
        file:{ type: Sequelize.STRING(100) },
        status: { type: Sequelize.ENUM('registered','finished') },
    }, {
        freezeTableName: true,
        tableName: 'task',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Task.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Task.create(param).then( task=> { resolve(task); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Task.findOne({ where : { id : param.id}}).then(task=> {
                        if(task !== null){
                            task.update(param).
                            then(function () { resolve(task.get()); }).
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
                        Task.findOne({ where: { id: param.id } }).then( task => { 
                            resolve(task ? task.get() : {});
                            return;
                        })              
                    });
                }

                var query = { raw: true, order: [["name", "ASC"]] };
                if (param.paging != undefined) { query.offset = param.paging.current;
                    query.limit = param.paging.show; }

                if (param.id != undefined && Array.isArray(param.id)) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ id: { $in: param.id } });
                }

                if (param.status != undefined && Array.isArray(param.status)) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ status: { $in: param.status } });
                }

                if (param.name != undefined) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ name: { $iLike: "%" + param.name + "%" }});
                }

                if (param.number != undefined) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ number: { $iLike: "%" + param.number + "%" }});
                }

                return Task.FindAllSend(query);

            }
        }
    });   
    Task.belongsTo(db.material, { foreignKey: 'idMaterial' });

    return Task;
}