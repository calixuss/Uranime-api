 /*
  * Here we define sequalize and how express would communicate with the database
  */ 
  var Sequelize = require('sequelize')
      ,dbconfig = require("./dbconfig");

  module.exports = function(app){

        var client = new Sequelize(dbconfig.db.database, dbconfig.db.username, dbconfig.db.password, {
          host: dbconfig.db.host,
          port: dbconfig.db.port,
          logging: dbconfig.db.logging,
          dialect: dbconfig.db.dialect,
          maxConcurrentQueries: 4,
          pool: { maxConnections: 4, maxIdleTime: 5000 },
          define: {
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            syncOnAssociation: false // to not automaticly create tables.. Can be a bitch..
          }
        });
    
    app.set("sequelize",Sequelize);
    app.set("dbClient",client);
    app.set("dbconfig",dbconfig);
};
