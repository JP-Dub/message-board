/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

let path = process.cwd();
const ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

var expect = require('chai').expect;

module.exports = function (app) {
  
  let clickHandler = new ClickHandler();
  
  app.route('/api/boards')
      .get(clickHandler.userBoards)
      .delete(clickHandler.deleteBoard);
  
  app.route('/api/threads/:board')
      .get(clickHandler.recentThreads)
      .post(clickHandler.createThreads)
      .put(clickHandler.reportThreads)
      .delete(clickHandler.deleteThreads);
    
  app.route('/api/replies/:board')
      .get(clickHandler.showReplies)
      .post(clickHandler.createReply)
      .put(clickHandler.reportReply)
      .delete(clickHandler.changeReply);

};
