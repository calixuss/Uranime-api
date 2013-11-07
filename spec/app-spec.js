var app = require("../app");
var request = require("../node_modules/request");

describe("Application is running", function(){
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

});