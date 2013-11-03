/*
 *  The genre model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        is_genre: Sequelize.BOOLEAN
    }
};

module.exports = function(app){
	 var client = app.get("dbClient");
    return client.define('genre', self.def);
};