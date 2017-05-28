
module.exports = function(api) {
	var Patient = {
		create(req, res) {
		    api.GetDB().patient.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		update(req, res) {
		    api.GetDB().patient.Update(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		delete(req, res) {
		    api.GetDB().patient.Delete(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		},
		get(req, res) {
		    api.GetDB().patient.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},

	}

	return Patient;
}