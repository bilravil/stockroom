
module.exports = function(api) {
	var Work = {
		create(req, res) {
		    api.GetDB().work.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		update(req, res) {
		    api.GetDB().work.Update(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		get(req, res) {
		    api.GetDB().work.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},

	}

	return Work;
}