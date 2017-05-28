
module.exports = function(api) {
	var Result = {
		create(req, res) {
		    api.GetDB().result.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		update(req, res) {
		    api.GetDB().result.Update(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(error.code).json(error))
		}
	}

	return Result;
}