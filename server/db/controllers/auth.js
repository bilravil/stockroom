
module.exports = function(api) {
	var Auth = {
		create(req, res) {
		    api.GetDB().auth.Create(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		login(req, res) {		        
            api.GetDB().auth.Login(req.body.login, req.body.password).then(
            	auth=>{
	            	req.session.authorized = true;
                    req.session.username = req.body.login;
                    req.session.uuid = auth.id;
                    console.log(req.body.login);
                    res.status(200).json({uuid: req.session.uuid})
	            },
	            error => res.status(500).json(error))
		},
		get(req, res) {
		    api.GetDB().auth.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},

	}

	return Auth;
}