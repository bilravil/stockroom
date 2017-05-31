
module.exports = function (engine,api) {
    var db = api.GetDB();
    var Sequelize = require('sequelize');
    var md5 = require('md5');
    var Role = engine.define('role', {
        name: { type: Sequelize.STRING(100) },
        rights: { type: Sequelize.JSON },
        id: { type: Sequelize.UUID,primaryKey: true, }
    },
		{
		    freezeTableName: true, tableName: 'role',
		    classMethods: {
		        FindAllSend: function(query) {
	                return new Promise( (resolve,reject) =>{
	                    Role.findAndCountAll(query).then( result => {
	                        if (result != null) resolve({ rows: result.rows, all: result.count });
	                        else resolve([]);
	                    });
	                });             
	            },
		        Create: function(param) {
	                return new Promise( (resolve,reject) =>{
	                    Role.create(param).then( role=> { resolve(role); })
	                      .catch(function (error){ reject(error); });
	                })
	            },
		        Get: function (param) {

		            var query = { raw: true/*,order:[["did","ASC"]]*/ };
		            if (param.paging != undefined) { query.offset = param.paging.current; query.limit = param.paging.show; }

		            if (param.id != undefined && Array.isArray(param.id)) {
	                    query.where = query.where || {};
	                    query.where.$and = query.where.$and || [];
	                    query.where.$and.push({ id: { $in: param.id } });
	                }

		            
		            return Role.FindAllSend(query);
		        },

		    }
		});
    return Role;
}