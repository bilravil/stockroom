if (__dirname !== process.cwd()) {
    process.chdir(__dirname);
}
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
const fs = require('fs');

const db = require('./server/db/index.js');

api = {
    GetHttp: function() { return http; },
    GetExpress: function () { return app; },
    GetSessionParser: function () { return sessionParser; },
    GetCookieParser: function () { return cookieParser; },   
    GetDB: function() { return db.GetDB(); },
};

function authorizeUrls() {
    function authorize(req, res, next) {
        var requestedUrl = url.parse(req.url).pathname;
        if (req.session.authorized === true) {
            next();
            return;               
        }
        if (requestedUrl.match('^/Db/Login')) { next(); return; }
        if (requestedUrl.match('^/bower_components')) { next(); return; }
        if (requestedUrl.match('^/js')) { next(); return; }
        if (requestedUrl.match('^/css')) { next(); return; }

        fs.readFile(__dirname + '/www/login.html', 'utf8', function(err, data) {
            if (err) return console.log(err);
            res.send(data.replace("{{urlBack}}", req.url));
        });
    }
    return authorize;
}

function Init(callback){
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            +
            next();
        }
    });
    

    app.use(cookieParser);
    app.use(sessionParser);

    app.use('/', authorizeUrls());
    app.use(express.static(__dirname + '/www'));

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

	http.listen(config.port, function() {
		callback(`Server started on port ${config.port}`);
	});
}

Init(function(msg){ console.log(msg); });
db.Run(config.db.connection,api,function(msg){ console.log(msg);});

