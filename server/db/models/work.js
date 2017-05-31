module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Work = engine.define('work', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        time: { type: Sequelize.INTEGER }
    }, {
        freezeTableName: true,
        tableName: 'work',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Work.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Work.create(param).then( work=> { resolve(work); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Work.findOne({ where : { id : param.id}}).then(work=> {
                        if(work !== null){
                            work.update(param).
                            then(function () { resolve(work.get()); }).
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
                        Work.findOne({ where: { id: param.id } }).then( work => { 
                            resolve(work ? work.get() : {});
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

                if (param.worker != undefined) {
                    query.include = query.include || [];
                    var q = { model: db.worker, as: 'worker' }
                    if (param.worker.id != undefined) {
                        q.where = q.where || {}; q.where.$and = q.where.$and || [];
                        q.where.$and.push({ id: param.worker.id });

                    }
                    query.include.push(q);
                }

                if (param.task != undefined) {
                    query.include = query.include || [];
                    var q = { model: db.task, as: 'task' }
                    if (param.task.id != undefined) {
                        q.where = q.where || {}; q.where.$and = q.where.$and || [];
                        q.where.$and.push({ id: param.task.id });

                    }
                    query.include.push(q);
                }

                return Work.FindAllSend(query);

            }
        }
    });   

    Work.belongsTo(db.worker, { foreignKey: 'idWorker' });
    Work.belongsTo(db.task, { foreignKey: 'idTask' });
    
    return Work;
}