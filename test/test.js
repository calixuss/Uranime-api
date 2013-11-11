/*
 * Main Test file
 */

//Set node environment to test
  process.env.NODE_ENV = 'test'

//Load modules
var should = require("../node_modules/should"),
    request = require("../node_modules/request"),
    app = require("../app").app,
    helper = require("./_helper");
/*
 * this hooks prepares the database with dummy data.
 */
beforeEach(function(){
   
    helper.CreateTestUser(app.get("models").User);
})

describe("User", function(){
    it("User should exists", function(){
        request("http://localhost:#{app.settings.port}/api/users/1",function(err,response,body){
           if(err)throw err;
           response.StatusCode.should.equal(200);
           done();
        });
    });
	
})



/*describe("Application is running", function(){
	it("It should return http status 200 ", function(){
		//expect(1+2).toEqual(3);
         request("http://localhost:3000/", function(err,response,body){
         	expect(response.StatusCode).toEqual(200);
         
         });
		
	});

});


describe("User exist", function(){
	it("It should return a user with id 2 ", function(){
         request("http://localhost:3000/api/users/2", function(err,response,body){
         	expect(body.id),toEqual(2);
         	done();
         });
		
	});

});*/