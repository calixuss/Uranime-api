/*
 *  The request model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        title: Sequelize.STRING,
        comment: Sequelize.TEXT,
        ip_adress: Sequelize.TEXT,
        poster: Sequelize.TEXT,
        fanart: Sequelize.TEXT
    }
};

module.exports = function(app){
	 var client = app.get("dbClient");
    return client.define('anime_request', self.def);
};