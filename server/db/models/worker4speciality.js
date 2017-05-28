module.exports = function(engine, api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Worker4Speciality = engine.define('worker4speciality', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 }
    }, {
        freezeTableName: true,
        tableName: 'worker4speciality',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Worker4Speciality.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Worker4Speciality.create(param).then( worker4speciality=> { resolve(worker4speciality); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Worker4Speciality.findOne({ where : { id : param.id}}).then(worker4speciality=> {
                        if(worker4speciality !== null){
                            worker4speciality.update(param).
                            then(function () { resolve(worker4speciality.get()); }).
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
                        Worker4Speciality.findOne({ where: { id: param.id } }).then( worker4speciality => { 
                            resolve(worker4speciality ? worker4speciality.get() : {});
                            return;
                        })              
                    });
                }

                var query = { raw: true, order: [["first", "ASC"]] };
                if (param.paging != undefined) { query.offset = param.paging.current;
                    query.limit = param.paging.show; }

                if (param.worker != undefined) {
	                query.include = query.include || [];
	                var q = { model: db.worker, as: 'worker' }
	                if (param.worker.id != undefined) {
	                    q.where = q.where || {}; q.where.$and = q.where.$and || [];
	                    q.where.$and.push({ id: param.worker.id });

	                }
	                query.include.push(q);
	            }

	            if (param.speciality != undefined) {
	                query.include = query.include || [];
	                var q = { model: db.speciality, as: 'speciality' }
	                if (param.speciality.id != undefined) {
	                    q.where = q.where || {}; q.where.$and = q.where.$and || [];
	                    q.where.$and.push({ id: param.speciality.id });

	                }
	                query.include.push(q);
	            }


                return Worker4Speciality.FindAllSend(query);

            }
        }
    });   
    Worker4Speciality.belongsTo(db.worker, { foreignKey: 'idWorker', as: "worker" });
    Worker4Speciality.belongsTo(db.speciality, { foreignKey: 'idSpeciality', as: "speciality" });
    return Worker4Speciality;
}