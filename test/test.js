/*
 * Main Test file
 */

//Set node environment to test
  process.env.NODE_ENV = 'test'

//Load modules
var should = require("../node_modules/should"),
    request = require("../node_modules/request"),
    app = require("../app"),
    helper = require("./_helper");
/*
 * this hooks prepares the database with dummy data.
 */
beforeEach(function(done){
 /*setTimeout(function(){
    helper.CreateTestUser(app.get("models").User).then(function(){done()});
      }, 3000);*/

    var client = app.get("dbClient");
      client.sync().success(function(){
          
           helper.CreateTestUser(app.get("models").User).then(function(){});
          done();
      }).error(function(err){
        throw err;

      })
        
   
})

describe("User", function(){
  var _body = null;
   before(function(done){
           request("http://localhost:3001/api/users/1",function(err,response,body){
               if(err)throw err;
                _body = body;
                done();
               });
        })  

   
    it("User with id equal 1 should exists", function(done){
       var usr = JSON.parse(_body);
            usr.id.should.equal(1);
           done();
        
	   })
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