'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Threads = new Schema({
  Board          : String,
  thread_id      : Number,
  text           : String,
  created_on     : Date,
  bumped_on      : Date,
  reported       : Boolean,
  delete_password: String,
  replies        : [{
    reply_id             : Number,
    text           : String,
    created_on     : Date,
    reported       : Boolean,
    delete_password: String
  }]
});

module.exports = mongoose.model('Threads', Threads);