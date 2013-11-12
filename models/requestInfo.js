/*
 *  The requestInfo model
 *  */
var Sequelize = require('sequelize');

self = {
    def: {
        scrape_id: Sequelize.INTEGER,
        scrape_comment: Sequelize.TEXT,
        site_id: Sequelize.INTEGER
    }
};

module.exports = function(client){
	
    return client.define('anime_request_scrape_info', self.def);
};