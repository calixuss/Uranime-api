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

module.exports = function(client){
	
    return client.define('anime_request', self.def);
};