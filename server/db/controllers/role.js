
module.exports = function(api) {
	var Role = {
		create(req, res) {
		    api.GetDB().role.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		get(req, res) {
		    api.GetDB().role.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},

	}

	return Role;
}