module.exports = function(engine,api) {
    var Sequelize = require('sequelize');
    var db = api.GetDB();

    var Score = engine.define('score', {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
        count: { type: Sequelize.INTEGER },
        releaseOnKG: { type: Sequelize.INTEGER },
        releaseOnMM: { type: Sequelize.INTEGER },
        releaseDate: { type: Sequelize.DATEONLY }, 
        purchaseOnKG: { type: Sequelize.INTEGER },
        purchaseOnMM: { type: Sequelize.INTEGER },
        purchaseCount: { type: Sequelize.INTEGER },
        price: { type: Sequelize.INTEGER },
        expendCount: { type: Sequelize.INTEGER },
        invoice: { type: Sequelize.STRING(255) }
    }, {
        freezeTableName: true,
        tableName: 'score',
        classMethods: {
            FindAllSend: function(query) {
                return new Promise( (resolve,reject) =>{
                    Score.findAndCountAll(query).then( result => {
                        if (result != null) resolve({ rows: result.rows, all: result.count });
                        else resolve([]);
                    });
                });             
            },

            Create: function(param) {
                return new Promise( (resolve,reject) =>{
                    Score.create(param).then( score=> { resolve(score); })
                      .catch(function (error){ reject(error); });
                })
            },

            Update: function(param) {
                return new Promise( (resolve,reject) =>{
                    Score.findOne({ where : { id : param.id}}).then(score=> {
                        if(score !== null){
                            score.update(param).
                            then(function () { resolve(score.get()); }).
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
                    Score.findOne({ where : { id : param.id}}).then( score=> {
                        if(score !== null){
                            param.state = 1;
                            score.update(param).
                            then(function () { resolve(score.get()); }).
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
                        Score.findOne({ where: { id: param.id } }).then( score => { 
                            resolve(score ? score.get() : {});
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

                return Score .FindAllSend(query);

            }
        }
    });   

    Score.belongsTo(db.material, { foreignKey: 'idMaterial' });
    Score.belongsTo(db.task, { foreignKey: 'idTask' });
    
    return Score ;
}