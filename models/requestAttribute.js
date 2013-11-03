/*
 *  The RequestAttribute model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        value: Sequelize.STRING,
        type_id: Sequelize.INTEGER
    }
};

module.exports = function(app){
	 var client = app.get("dbClient");
    return client.define('anime_request_scrape_attributes', self.def);
};