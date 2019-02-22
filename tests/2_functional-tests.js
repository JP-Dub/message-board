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
      test('Start a new board/board using POST', function(done) {
         chai.request(server)
          .post('/api/threads/Testing')
          .send({
            board: 'Testing',
            text : 'Testing...1,2,3',
            delete_password: 'test'
           }) 
          .end(function(err, res){
           console.log(res)
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');       
            done();
          });
      });      
    });
    
    suite('GET', function() {
      test('Redirect to board/thread that we just created using GET', function(done) {
         chai.request(server)
          .get('/b/Testing/')
          .send({
            board: 'Testing',
           }) 
          .end(function(err, res){
            
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');       
            done();
          });
      });        
    });
    
    suite('Delete Board', function() {
      test('Delete the Test Board', function(done) {
         chai.request(server)
          .delete('/api/boards')
          .send({
            board: 'Testing',
           }) 
          .end(function(err, res){
            assert.equal(res.status, 202);
            done();
          });
      });      
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
