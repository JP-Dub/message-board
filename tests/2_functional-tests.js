/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Start a new thread', function(done) {
       chai.request(server)
        .post('/api/threads/:board')
        .send({
          board: 'Testing',
          text : 'Testing...1,2,3',
          delete_password: 'test'
         }) 
        .end(function(err, res){
         console.log(res.body)
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'should return and object');
          assert.propertyVal(res.body.board, 'board', 'Testing');         
          done();
        });
      });      
    });
    
    suite('GET', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
  });

});
