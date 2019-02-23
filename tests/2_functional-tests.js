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

let thread_Id,
    reply_Id;

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Start a new board/thread using POST', function(done) {
         chai.request(server)
          .post('/api/threads/Testing')
          .type('form')
          .send({
            board: 'Testing',
            text : 'Testing...1,2,3',
            delete_password: 'test'
           }) 
          .end(function(err, res) {
            assert.equal(          res.status, 200);
            assert.isDefined(res.redirects[0], 'array contains a defined item');
            done();
          });
      });      
    });
    
    suite('GET', function() {
      test('Redirect to board/thread that we just created using GET', function(done) {
         chai.request(server)
          .get('/api/threads/Testing')
          // .send({
          //   board: 'Testing',
          //  }) 
          .end(function(err, res) {  
            thread_Id = res.body.content[0]._id;
            assert.equal(res.status, 200);
            assert.equal(               res.body.content[0].text, 'Testing...1,2,3');
            assert.notExists(       res.body.content[0].reported, 'reported field is not being returned');
            assert.notExists(res.body.content[0].delete_password, 'delete_password field is not being returned');
            done();
          });
      });        
    });      
    
    suite('PUT', function() {
      test('Test button function to report a thread', function(done) {
         chai.request(server)
          .put('/api/threads/Testing')
          .send({
            board: 'Testing',
            report_id: thread_Id,
           }) 
          .end(function(err, res) {  
            //console.log('thread PUT request= ', res.text, thread_Id)
            assert.equal(res.status, 200);
            assert.equal(  res.text, 'success');
            done();
          });
      });       
    });
    
    // suite('DELETE', function() {
    //   test('DELETE thread that was created', function(done) {
    //      chai.request(server)
    //       .delete('/b/Testing/')
    //       .send({
    //         board: 'Testing',
    //        }) 
    //       .end(function(err, res){  
    //        //console.log(res)
    
    //         let replies = res.body.content[0].replies[0];
    //         assert.equal(res.status, 200);
    //         assert.equal(               replies.text, 'Testing...1,2,3');
    //         assert.notExists(       replies.reported, 'reported field is not being returned');
    //         assert.notExists(replies.delete_password, 'delete_password field is not being returned');
    //         done();
    //       });
    //   });       
    // });    
    
 

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('Create a reply to the `Testing` thread', function(done) {
         chai.request(server)
          .post('/api/replies/Testing')
          .send({
            thread_id: thread_Id,
            text: '...testing replies',
            delete_password: 'replies'
           }) 
          .end(function(err, res) {  
            //console.log('POST request to reply', res.body, thread_Id, res.redirects, res.header)
            assert.equal(          res.status, 200);
            assert.isDefined(res.redirects[0], 'array contains a defined item');
            done();
          });
      });        
      
    });  
    
    suite('GET', function() {
      test('GET the full thread and reveal all replies', function(done) {
         chai.request(server)
          .get('/api/replies/Testing')
          .query({
            thread_id: thread_Id,
           }) 
          .end(function(err, res) { 
            reply_Id = res.body.replies[0]._id;
            //console.log('GET request to replies', res.body)
            assert.equal(res.status, 200);
            assert.equal(               res.body.replies[0].text, '...testing replies');
            assert.notExists(       res.body.replies[0].reported, 'reported field is not being returned');
            assert.notExists(res.body.replies[0].delete_password, 'delete_password field is not being returned');
            done();
          });
      });      
    }); 
    
    suite('PUT', function() {
      test('Test button function to report a thread', function(done) {
         chai.request(server)
          .put('/api/replies/Testing')
          .send({
            thread_id: thread_Id,
            reply_id : reply_Id,
           }) 
          .end(function(err, res) {  
            //console.log('thread PUT request= ', res.text, thread_Id)
            assert.equal(res.status, 200);
            assert.equal(  res.text, 'success');
            done();
          });
      });      
    });
    
    suite('DELETE BOARD', function() {
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
    
  });

});
