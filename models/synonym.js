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

module.exports = function(client){
	
    return client.define('anime_synonyms', self.def);
};