/*
 *  The token model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        token: Sequelize.STRING,
        createdAt: Sequelize.DATE,

    }
};

module.exports = function(app){
	var client = app.get("dbClient");
    return client.define('tokens', self.def);
};
