'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Threads = new Schema({
  board          : String,
  thread_id      : Number,
  text           : String,
  created_on     : Date,
  bumped_on      : Date,
  reported       : Boolean,
  delete_password: String,
  replycount     : Number,
  replies        : [{
    thread_id       : Number,
    text           : String,
    created_on     : Date,
    reported       : Boolean,
    delete_password: String
  }]
  
});

module.exports = mongoose.model('Threads', Threads);