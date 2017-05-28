const express = require('express');
const url = require('url');
const cookieParser = require('cookie-parser')();
const path = require('path');
const session = require('express-session');
const sessionParser = session({ secret: 'keyboard cat', resave: true, saveUninitialized: true });
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const config = require('./config.json');
const app = express();
const http = require('http').Server(app);

const db = require('./server/db/index.js');

var api = {
    GetHttp: function() { return http; },
    GetExpress: function () { return app; },
    GetSessionParser: function () { return sessionParser; },
    GetCookieParser: function () { return cookieParser; },   
    GetDB: function() { return db.GetDB(); },
};

function Init(callback){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	http.listen(config.port, function() {
		callback(`Server started on port ${config.port}`);
	});
}

Init(function(msg){ console.log(msg); });
db.Run(config.db.connection,api, function(msg){ console.log(msg);});

