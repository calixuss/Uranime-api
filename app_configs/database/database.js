 /*
  * Here we define sequalize and how express would communicate with the database
  */ 
  var Sequelize = require('sequelize')
      ,dbconfig = require("./dbconfig");

   
function setTestingConfig(app){
  console.log("Testing config loaded")
  var client = new Sequelize(dbconfig.test.database,dbconfig.test.username,dbconfig.test.password,{
      logging:console.log,
      dialect:'sqlite',
      storage:'uranime.sqlite',
      define:{
        underscored:true,
        freezeTableName:true,
        syncOnAssociation:true,
        timestamps:false
      }

  });

  app.set("sequelize",Sequelize);
    app.set("dbClient",client);
    app.set("dbconfig",dbconfig);
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
    
    app.set("sequelize",Sequelize);
    app.set("dbClient",client);
    app.set("dbconfig",dbconfig);
};


module.exports.SetTestingConfig = setTestingConfig;
module.exports.SetProductionConfig = setProductionConfig;
