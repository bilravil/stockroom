module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Stock = engine.define('stock', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        number: { type: Sequelize.STRING(10)}
    }, {
        freezeTableName: true,
        tableName: 'stock',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Stock.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Stock.create(param).then( stock=> { resolve(stock); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Stock.findOne({ where : { id : param.id}}).then(stock=> {
                        if(stock !== null){
                            stock.update(param).
                            then(function () { resolve(stock.get()); }).
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
                    Stock.findOne({ where : { id : param.id}}).then( stock=> {
                        if(stock !== null){
                            param.state = 1;
                            stock.update(param).
                            then(function () { resolve(stock.get()); }).
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
                        Stock.findOne({ where: { id: param.id } }).then( stock => { 
                            resolve(stock ? stock.get() : {});
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

                if (param.number != undefined) {
                    query.where = query.where || {};
                    query.where.$and = query.where.$and || [];
                    query.where.$and.push({ number: { $iLike: "%" + param.number + "%" }});
                }



                return Stock.FindAllSend(query);

            }
        }
    });   
    return Stock;
}