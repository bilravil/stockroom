
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
                    res.status(200).json({uuid: req.session.uuid})
	            },
	            error => res.status(500).json(error))
		},
		logout(req, res) {		 
			delete req.session.authorized;
        	delete req.session.username;
        	res.send({ success: true });       
		},
		get(req, res) {
		    api.GetDB().auth.Get(req.body).then( 
		    	result => res.status(200).json(result),
		    	error => res.status(500).json(error))
		},
		getAuth(req,res){
			api.GetDB().auth.Get({login:req.session.username}).then(
				user => {
					api.GetDB().role.Get({id:user.idRole}).then(role=>res.send(role),err=>console.log(err))
				},err=>console.log(err))
				
		}

	}

	return Auth;
}