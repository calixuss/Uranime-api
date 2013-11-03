/*
 *  The synonym model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        title: Sequelize.STRING,
        lang: Sequelize.STRING
    }
};

module.exports = function(app){
	 var client = app.get("dbClient");
    return client.define('anime_synonyms', self.def);
};