'use stric';

var Threads = require('../models/users.js');

function ClickHandler() {
 
/* /// app.route('/api/threads/:board')  \\\ */  
  this.recentThreads = (req, res) => {
    console.log('recentThreads', req.body, req.params, req.query)
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
      .findOneAndUpdate({board: req.body.board})
      .exec( (err, threads) => {
      if(err) throw err;
      if(!threads) {
        let board = new Threads();
        
        board.board = req.body.board;
        board.content.thread_id = '0001';
        board.content.text = req.body.text;
        board.content.created_on = 
      }
    });
    
    //res.redirect('/b/' + req.body.board)
  };
  
  this.reportThreads = (req, res) => {
   console.log('reportThreads', req.body)
  };
  
  this.deleteThreads = (req, res) => {
    console.log('deleteThreads', req.body, req.params, req.query)
  };  
  
/*  /// app.route('/api/replies/:board')  \\\  */  
  
  this.showReplies = (req, res) => {
    console.log('showReplies', req.body, req.params, req.query)
  }; 

  this.createReply = (req, res) => {
    console.log('createReply', req.body)
  };   
  
  this.reportReply = (req, res) => {
    console.log('reportReply', req.body)
  };     
  
  this.changeReply = (req, res) => {
    console.log('changeReply', req.body)
  };         
  
};

module.exports = ClickHandler;