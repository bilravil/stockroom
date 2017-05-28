var router = require("express").Router();


module.exports = function(api) {
	const patient = require('./patient.js')(api);
	const research = require('./research.js')(api);
	const service = require('./service.js')(api);

	router.post("/Patient/Create", patient.create);
	router.post("/Patient/Update", patient.update);
	router.post("/Patient/Delete", patient.delete);
	router.post("/Patient/Get", patient.get);

	router.post("/Research/Create", research.create);
	router.post("/Research/Update", research.update);
	router.post("/Research/Delete", research.delete);
	router.post("/Research/Get", research.get);

	router.post("/Service/Create", service.create);
	router.post("/Service/Update", service.update);
	router.post("/Service/Delete", service.delete);
	router.post("/Service/Get", service.get);


	return router;
}

 

