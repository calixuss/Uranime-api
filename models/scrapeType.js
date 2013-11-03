/*
 *  The scrapeType model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        type: Sequelize.STRING,
        description: Sequelize.TEXT
    }
};

module.exports = function(app){
	 var client = app.get("dbClient");
    return client.define('scrape_types', self.def)
};