module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var StockTaking = engine.define('stocktaking', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        count: { type: Sequelize.INTEGER },
        in: { type: Sequelize.INTEGER },
        out: { type: Sequelize.INTEGER }
    }, {
        freezeTableName: true,
        tableName: 'stocktaking',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    StockTaking.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    StockTaking.create(param).then( stocktaking=> { resolve(stocktaking); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    StockTaking.findOne({ where : { id : param.id}}).then(stocktaking=> {
                        if(stocktaking !== null){
                            stocktaking.update(param).
                            then(function () { resolve(stocktaking.get()); }).
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
                    StockTaking.findOne({ where : { id : param.id}}).then( stocktaking=> {
                        if(stocktaking !== null){
                            param.state = 1;
                            stocktaking.update(param).
                            then(function () { resolve(stocktaking.get()); }).
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
                        StockTaking.findOne({ where: { id: param.id } }).then( stocktaking => { 
                            resolve(stocktaking ? stocktaking.get() : {});
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

                if (param.stock != undefined) {
                    query.include = query.include || [];
                    var q = { model: db.stock, as: 'stock' }
                    if (param.stock.id != undefined) {
                        q.where = q.where || {}; q.where.$and = q.where.$and || [];
                        q.where.$and.push({ id: param.stock.id });

                    }
                    query.include.push(q);
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

                return StockTaking.FindAllSend(query);

            }
        }
    });   

    StockTaking.belongsTo(db.stock, { foreignKey: 'idStock' });
    StockTaking.belongsTo(db.material, { foreignKey: 'idMaterial' });
    
    return StockTaking;
}