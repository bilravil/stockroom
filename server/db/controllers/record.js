
module.exports = function(api) {
	var Record = {
		create(req, res) {
		    api.GetDB().record.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		update(req, res) {
		    api.GetDB().record.Update(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		delete(req, res) {
		    api.GetDB().record.Delete(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		get(req, res) {
		    api.GetDB().record.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},

	}

	return Record;
}