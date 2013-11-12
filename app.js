/**
 *Main application file
 *
 */

//Load modules
var express = require('express');

//Init express
var app = express();
//load authnetication middleware 
app.set("Auth",require("./app_configs/middleware/auth"));

//Add configuration to the express instance
require("./app_configs/express")(app);
//bootstrap database connection
//require(("./app_configs/database/database"))(app);

//bootstrap models
//  require()
//app.set("models",require("./models/")(app));


//bootstrap controlers
app.set("controllers",require("./controllers/controllers"));
//bootstrap routes
require("./app_configs/routes")(app);

// Start the app by listening on <port>
app.listen(app.get("port"));
console.log('Express app started on port '+app.get("port"));

exports.app = app;