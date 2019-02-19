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
  
  app.route('/api/threads/:board')
      .get()
      .post()
      .put()
      .delete();
    
  app.route('/api/replies/:board')
      .get()
      .post()
      .put()
      .delete();

};
