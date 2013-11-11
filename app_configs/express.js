/*
 * Config file for express.js. Here we define any configuratoin related to express instance such as middlewars, global variables
 * and any other configuration related to the 
 */

 //Load dependencies
var express = require('express')
    ,path = require('path')
    ,dbconfig = require("./database/database");

module.exports = function(app){

	app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'client/build')));
});

app.configure('production', function(){
    console.log("prod env");
 dbconfig.SetProductionConfig(app);
 app.use(express.errorHandler());
});

app.configure('development', function(){
    console.log("dev env");
  dbconfig.SetProductionConfig(app);  
  app.use(express.errorHandler());
});

app.configure('test',function(){
    console.log("test env");
     app.set('port', 3001);
     dbconfig.SetTestingConfig(app);  
     app.get("dbClient").sync();

});

}