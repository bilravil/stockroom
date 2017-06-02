module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Speciality = engine.define('speciality', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        name: { type: Sequelize.STRING(255) },
        code: { type: Sequelize.INTEGER }
    }, {
        freezeTableName: true,
        tableName: 'speciality',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Speciality.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Speciality.create(param).then( speciality=> { resolve(speciality); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Speciality.findOne({ where : { id : param.id}}).then(speciality=> {
                        if(speciality !== null){
                            speciality.update(param).
                            then(function () { resolve(speciality.get()); }).
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
                        Speciality.findOne({ where: { id: param.id } }).then( speciality => { 
                            resolve(speciality ? speciality.get() : {});
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

                if (param.code != undefined) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ code: { $eq: param.code } });
                }

                if (param.name != undefined) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ name: { $iLike: "%" + param.name + "%" }});
                }


                return Speciality.FindAllSend(query);

            }
        }
    });   
    
    return Speciality;
}