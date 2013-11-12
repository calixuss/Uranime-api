 /*
  * Here we define sequalize and how express would communicate with the database
  */ 
  var Sequelize = require('sequelize')
      ,dbconfig = require("./dbconfig");

   
function setTestingConfig(app){
  
  var client = new Sequelize('anime','animeuser','animepass',{
      logging:console.log,
      dialect:'sqlite',
      storage:'uranime.sqlite',
      define:{
          underscored: true,
          freezeTableName: true,
          syncOnAssociation: true,
          timestamps: false
      }

  });

  
  app.set("models",require("../../models")(client));
  app.set("sequelize",Sequelize);
  app.set("dbClient",client);
  app.set("dbconfig",dbconfig);

  client.sync().success(function(){
    console.log("Awesome");
  }).error(function(err){
    console.log("Not some awesome "+err);
  })
};

function setProductionConfig(app){
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
    
     app.set("models",require("../../models")(client));
     app.set("sequelize",Sequelize);
     app.set("dbClient",client);
     app.set("dbconfig",dbconfig);
};


module.exports.SetTestingConfig = setTestingConfig;
module.exports.SetProductionConfig = setProductionConfig;
