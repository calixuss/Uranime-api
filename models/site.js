/*
 *  The site model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        url: Sequelize.STRING,
        link_id: Sequelize.STRING
    }
};

module.exports = function(app){
	 var client = app.get("dbClient");
    return client.define('sites', self.def)
};