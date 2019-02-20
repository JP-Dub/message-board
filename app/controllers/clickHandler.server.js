'use stric';

var Threads = require('../models/users.js');

function ClickHandler() {
 
/* /// app.route('/api/threads/:board')  \\\ */  
  this.recentThreads = (req, res) => {
    console.log('recentThreads', req.body, req.params, req.query)
    Threads
      .find({board: req.params.board})
      .exec( (err, threads) => {
        if(err) throw err;
        //console.log(threads);
        res.json(threads)
       
    });
  };
/*  
  board          : String,
  content :[{
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
  }]
*/
  this.createThreads = (req, res) => {
    //console.log('createThreads', req.body)
    Threads
      .findOne({board: req.body.board})
      //.sort({'thread_id': -1})
      .exec( (err, threads) => {
      if(err) throw err;
       console.log('threads', threads)
     
      let board = threads;
      let num = !threads ? 0 : threads.content[threads.content.length-1].thread_id + 1;
      if(!threads) { 
        board = new Threads();
        board.board = req.body.board;
        num = 1;
      }
      
      board.content.push({
        thread_id : num,
        text : req.body.text,
        created_on : new Date().toString(),
        bumped_on : new Date().toString(),
        reported : false,
        delete_password : req.body.delete_password,
        replies : [],
        replycount : 0
      })
        
      // board.save( (err, success) => {
      //   if(err) throw err;
      //   //console.log(success)
      // });
      
    });
    
    res.redirect('/b/' + req.body.board +'/')
  };
  
  this.reportThreads = (req, res) => {
   console.log('reportThreads', req.body)
  };
  
  this.deleteThreads = (req, res) => {
    console.log('deleteThreads', req.body, req.params, req.query)
    Threads
      .findOne({board: req.params.board})
      .exec((err, thread) => {
      if(err) throw err;
      console.log(thread)
    });
  };  
  
/*  /// app.route('/api/replies/:board')  \\\  */  
  let showReplies;
  this.showReplies = (req, res) => {
    console.log('showReplies', req.body, req.params, req.query)
    Threads
      .findOne({board: req.params.board})
      .exec( (err, show) => {
        if(err) throw err;
      console.log('show', show)
        show.content.forEach( (id, i) => {
          if(id._id == req.query.thread_id) {
            console.log(show.content[i])
            res.json(show.content[i])
          }
        });
    });
    //res.json(showReplies)
  }; 

  this.createReply = (req, res) => {
    console.log('createReply', req.body, req.params)
    Threads
      .findOne({board : req.params.board})
      .exec( (err, update) => {
        if(err) throw err;
        //console.log(update)
      
        update.content.forEach( (id, i) => {
          if(id._id == req.body.thread_id) {
            update.content[i].replies.push({
              text           : req.body.text,
              created_on     : new Date().toString(),
              reported       : false,
              delete_password: req.body.deleted_password  
            });
            update.content[i].bumped_on = new Date().toString();
            update.content[i].replycount+= 1;
          }
        });
      
        update.save((err, success) => {
          showReplies = success;
          res.redirect('/b/' + req.params.board + '/' + req.body.thread_id);
        });
       //res.redirect('/b/' + req.params.board + '/' + req.body.thread_id);
      
    });
  };   
  
  this.reportReply = (req, res) => {
    console.log('reportReply', req.body)
  };     
  
  this.changeReply = (req, res) => {
    console.log('changeReply', req.body, req.params, req.query)
    Threads
      .findOneAndDelete({'content._id': req.body.reply_id})
      .where('delete_password', req.body.delete_password)
      .exec('
  };         
  
};

module.exports = ClickHandler;