module.exports = function(engine, api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Property = engine.define('property', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },   
        density: { type: Sequelize.INTEGER },
        sortament: { type: Sequelize.INTEGER },
        diameter: { type: Sequelize.INTEGER },
        length: { type: Sequelize.INTEGER },
        weight: { type: Sequelize.INTEGER },
    }, {
        freezeTableName: true,
        tableName: 'property',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Property.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Property.create(param).then( property=> { resolve(property); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Property.findOne({ where : { id : param.id}}).then(property=> {
                        if(property !== null){
                            property.update(param).
                            then(function () { resolve(property.get()); }).
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
                        Property.findOne({ where: { id: param.id } }).then( property => { 
                            resolve(property ? property.get() : {});
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

                if (param.material != undefined) {
                    query.include = query.include || [];
                    var q = { model: db.material, as: 'material' }
                    if (param.material.id != undefined) {
                        q.where = q.where || {}; q.where.$and = q.where.$and || [];
                        q.where.$and.push({ id: param.material.id });

                    }
                    query.include.push(q);
                }


                return Property.FindAllSend(query);

            }
        }
    });   

    return Property;
}