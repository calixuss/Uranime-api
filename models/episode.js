/*
 *  The episode model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        image: Sequelize.STRING,
        number: Sequelize.INTEGER,
        special: Sequelize.BOOLEAN,
        aired: Sequelize.DATE
    }
};

module.exports = function(db){
    return db.define('episodes', self.def);
};