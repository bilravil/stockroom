var router = require("express").Router();


module.exports = function(api) {
	const stock = require('./stock.js')(api);
	const stocktaking = require('./stocktaking.js')(api);
	const material = require('./material.js')(api);
	const worker = require('./worker.js')(api);
	const speciality = require('./speciality.js')(api);
	const w4s = require('./worker4speciality.js')(api);
	const property = require('./property.js')(api);
	const task = require('./task.js')(api);
	const work = require('./work.js')(api);
	const score = require('./score.js')(api);
	const salary = require('./salary.js')(api);
	const auth = require('./auth.js')(api);
	const role = require('./role.js')(api);

	router.post("/Login", auth.login);
	router.post("/Login/Create", auth.create);
	router.post("/Login/Get", auth.get);

	router.post("/Role/Create", role.create);
	router.post("/Role/Get", role.get);

	router.post("/Stock/Create", stock.create);
	router.post("/Stock/Update", stock.update);
	router.post("/Stcok/Delete", stock.delete);
	router.post("/Stock/Get", stock.get);

	router.post("/StockTaking/Create", stocktaking.create);
	router.post("/StockTaking/Update", stocktaking.update);
	router.post("/StockTaking/Delete", stocktaking.delete);
	router.post("/StockTaking/Get", stocktaking.get);

	router.post("/Material/Create", material.create);
	router.post("/Material/Update", material.update);
	router.post("/Material/Delete", material.delete);
	router.post("/Material/Get", material.get);

	router.post("/Worker/Create", worker.create);
	router.post("/Worker/Update", worker.update);
	router.post("/Worker/Delete", worker.delete);
	router.post("/Worker/Get", worker.get);

	router.post("/Speciality/Create", speciality.create);
	router.post("/Speciality/Update", speciality.update);
	router.post("/Speciality/Get", speciality.get);

	router.post("/W4S/Create", w4s.create);
	router.post("/W4S/Update", w4s.update);
	router.post("/W4S/Get", w4s.get);

	router.post("/Property/Create", property.create);
	router.post("/Property/Update", property.update);
	router.post("/Property/Get", property.get);

	router.post("/Task/Create", task.create);
	router.post("/Task/Update", task.update);
	router.post("/Task/Get", task.get);

	router.post("/Work/Create", work.create);
	router.post("/Work/Update", work.update);
	router.post("/Work/Get", work.get);

	router.post("/Score/Create", score.create);
	router.post("/Score/Update", score.update);
	router.post("/Score/Delete", score.delete);
	router.post("/Score/Get", score.get);

	router.post("/Salary/Create", salary.create);
	router.post("/Salary/Update", salary.update);
	router.post("/Salary/Delete", salary.delete);
	router.post("/Salary/Get", salary.get);

	return router;
}

 

