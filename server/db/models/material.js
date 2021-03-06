module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Material = engine.define('material', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        name: { type: Sequelize.STRING(255) },
        type: { type: Sequelize.STRING(255) },
        count:{ type: Sequelize.INTEGER },
        price:{ type: Sequelize.INTEGER },
        state: { type: Sequelize.INTEGER , defaultValue: 0 }
    }, {
        freezeTableName: true,
        tableName: 'material',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Material.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Material.create(param).then( material=> { resolve(material); })
                    .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Material.findOne({ where : { id : param.id}}).then(material=> {
                        if(material !== null){
                            material.update(param).
                            then(function () { resolve(material.get()); }).
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
                    Material.findOne({ where : { id : param.id}}).then( material=> {
                        if(material !== null){
                            param.state = 1;
                            material.update(param).
                            then(function () { resolve(material.get()); }).
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
                        Material.findOne({ where: { id: param.id } }).then( material => { 
                            resolve(material ? material.get() : {});
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

                    if (param.name != undefined) {
                        query.where = query.where || {};
                        query.where.$and = query.where.$and || [];
                        query.where.$and.push({ name: { $iLike: "%" + param.name + "%" }});
                    }

                    if (param.type != undefined) {
                        query.where = query.where || {};
                        query.where.$and = query.where.$and || [];
                        query.where.$and.push({ type: { $iLike: "%" + param.type + "%" }});
                    }

                    if (param.property != undefined) {
                        query.include = query.include || [];
                        var q = { model: db.property , as:'property'}
                        if (param.property.id != undefined) {
                            q.where = q.where || {}; q.where.$and = q.where.$and || [];
                            q.where.$and.push({ id: param.property.id});

                        }
                        query.include.push(q);
                    }

                    if (param.stock != undefined) {
                        query.include = query.include || [];
                        var q = { model: db.stock , as:'stock'}
                        if (param.stock.id != undefined) {
                            q.where = q.where || {}; q.where.$and = q.where.$and || [];
                            q.where.$and.push({ id: param.stock.id});

                        }
                        query.include.push(q);
                    }

                return Material.FindAllSend(query);

            }
        }
    });   

Material.belongsTo(db.property, { foreignKey: 'idProperty' });
Material.belongsTo(db.stock, { foreignKey: 'idStock' });
return Material;
}