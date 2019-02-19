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
      
        res.json(threads)
        console.log(threads);
    });
  };
/*  
  board  : String,
  content: {
    thread_id      : Number,
    text           : String,
    created_on     : Date,
    bumped_on      : Date,
    reported       : Boolean,
    delete_password: String,
    replies        : [{
      reply_id       : Number,
      text           : String,
      created_on     : Date,
      reported       : Boolean,
      delete_password: String
    }]
  }
*/
  this.createThreads = (req, res) => {
    console.log('createThreads', req.body)
    Threads
      .findOne({board: req.body.board})
      .sort({'thread_id': -1})
      .exec( (err, threads) => {
      if(err) throw err;
      
      let board = new Threads();
      
      let num;
      if(!threads) { 
        board.board = req.body.board;
        num = 1;
      }
        board.thread_id = num|| threads.thread_id++;
        board.text = req.body.text;
        board.created_on = new Date().toString();
        board.bumped_on = board.created_on;
        board.reported = false;
        board.delete_password = req.body.delete_password;
        board.replies = [];
        board.replycount = board.replies.length;
        
        board.save( (err, success) => {
          if(err) throw err;
          console.log(success)
        });
      
    });
    
    res.redirect('/b/' + req.body.board)
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
  
  this.showReplies = (req, res) => {
    console.log('showReplies', req.body, req.params, req.query)
  }; 

  this.createReply = (req, res) => {
    console.log('createReply', req.body)
    Threads
      .findOneAndUpdate({_id: req.body.thread_id},
                        { replies: [{
                          thread_id : 1,
                          text: req.body.text,
                          created_on: new Date().toString(),
                          reported: false,
                          delete_password: req.body.delete_password
                        }],
                        })
      .exec( (err, update) => {
        if(err) throw err;
      console.log(update)
      res.json(update);
    });
  };   
  
  this.reportReply = (req, res) => {
    console.log('reportReply', req.body)
  };     
  
  this.changeReply = (req, res) => {
    console.log('changeReply', req.body)
  };         
  
};

module.exports = ClickHandler;