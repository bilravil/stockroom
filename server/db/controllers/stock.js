
module.exports = function(api) {
	var Stock = {
		create(req, res) {
		    api.GetDB().stock.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		update(req, res) {
		    api.GetDB().stock.Update(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		delete(req, res) {
		    api.GetDB().stock.Delete(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		get(req, res) {
		    api.GetDB().stock.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},

	}

	return Stock;
}