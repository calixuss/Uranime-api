/*
 * Helper file containing function to set neccasary testing prerequisites
 */

 
/*
 * Creates a test user in to the test user table
 *@param USer - Sequelize User Model instance
 */

 function createTestUser(User){
 	
	  User.create({
	  	nick:'AwesomeUser',
	  	joined: new Date(),
        email: 'awesome@awesomeness.com',
        desc: "",
        password: "03d67c263c27a453ef65b29e30334727333ccbcd",
        pw_version: 1
	  }).success(function(user){
         console.log("user created")
	  }).error(function(err){

	  	console.log("failed to create test user "+err);
	  })
 };

 module.exports.CreateTestUser = createTestUser;

