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

module.exports = function(client){
	
    return client.define('tokens', self.def);
};
