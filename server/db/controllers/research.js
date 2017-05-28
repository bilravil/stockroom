
module.exports = function(api) {
	var Research = {
		create(req, res) {
		    api.GetDB().research.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		update(req, res) {
		    api.GetDB().research.Update(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		delete(req, res) {
		    api.GetDB().research.Delete(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		get(req, res) {
		    api.GetDB().research.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},

	}

	return Research;
}