
module.exports = function (engine,api) {
    var db = api.GetDB();
    var Sequelize = require('sequelize');
    var md5 = require('md5');
    var Auth = engine.define('auth', {
        login: { type: Sequelize.STRING(100),primaryKey: true, },
        password: { type: Sequelize.STRING(100) }
    },
		{
		    freezeTableName: true, tableName: 'auth',
		    classMethods: {
		        FindAllSend: function(query) {
	                return new Promise( (resolve,reject) =>{
	                    Auth.findAndCountAll(query).then( result => {
	                        if (result != null) resolve({ rows: result.rows, all: result.count });
	                        else resolve([]);
	                    });
	                });             
	            },
		        Create: function(param) {
	                return new Promise( (resolve,reject) =>{
	                    Auth.create(param).then( auth=> { resolve(auth); })
	                      .catch(function (error){ reject(error); });
	                })
	            },
		        Get: function (param) {

		            if (param.login != undefined ) {
	                    return new Promise( (resolve,reject) =>{
	                        Auth.findOne({ where: { login: param.login } }).then( auth => { 
	                            resolve(auth ? auth.get() : {});
	                            return;
	                        })              
	                    });
	                }

		            var query = { raw: true/*,order:[["did","ASC"]]*/ };
		            if (param.paging != undefined) { query.offset = param.paging.current; query.limit = param.paging.show; }
		            

		            
		            if (param.role != undefined) {
	                    query.include = query.include || [];
	                    var q = { model: db.role, as: 'role' }
	                    if (param.role.name != undefined) {
	                        q.where = q.where || {}; q.where.$and = q.where.$and || [];
	                        q.where.$and.push({ name: param.role.name });

	                    }
	                    query.include.push(q);
	                }

		            return Auth.FindAllSend(query);
		        },

		        Login: function (login, password) {
		        	return new Promise( (resolve,reject) =>{
		        		Auth.findOne({ where: { $and: [{ login: login }, { password: password }] } }).then(function (data) {
			                if (data == null) reject("Неверный логин или пароль!"); else resolve(data.get());
			            });
		        	});
		        }

		    }
		});
    Auth.belongsTo(db.role, { foreignKey: 'idRole' });

    return Auth;
}