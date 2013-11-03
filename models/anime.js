/*
 *  The anime model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        title: Sequelize.STRING,
        desc: Sequelize.TEXT,
        image: Sequelize.STRING,
        fanart: Sequelize.STRING,
        status: Sequelize.STRING,
        runtime: Sequelize.INTEGER,
        classification: Sequelize.STRING,
        type: Sequelize.STRING
    }
};

module.exports = function(app){
    var client = app.get("dbClient");

    return client.define('anime', self.def);
    
};