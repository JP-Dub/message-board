'use stric';

var Threads = require('../models/users.js');

function ClickHandler() {
  
/* ///  app.route('api/boards')  \\\  */
  
  
  this.userBoards = (req, res) => {
    Threads
      .find({}).exec((err, boards) => {
      if(err) throw err;     
      return res.json(boards);
    });                     
  };
  
  this.deleteBoard = (req, res) => {
    Threads
      .findOneAndDelete({board: req.body.board})
      .exec((err, boards) => {
      if(err) throw err;
      if(!boards) return res.status(400)
      return res.status(202).json(boards);
    });   
        
  };
  
 
/* ///  app.route('/api/threads/:board')  \\\ */  
  
  
  this.recentThreads = (req, res) => {
    //console.log('recentThreads', req.body, req.params,)
    Threads
      .findOne({board: req.params.board})
      .select({'content.reported'       : 0, 
               'content.delete_password': 0
              })
      .exec( (err, board) => {
        if(err) throw err;
        //console.log(board)
        if(board.content.length > 9) board.content.splice(10);
        board.content.forEach(arr => {
         
          arr.replies.splice(3);
        });
      
       return res.json(board)
    });
  };

  this.createThreads = (req, res) => {
    //console.log('createThreads', req.body)
    Threads
      .findOne({board: req.body.board})
      .exec( (err, threads) => {
        if(err) throw err;
        //console.log('threads', threads)

        let board = threads;
        let num   = !threads ? 1 
                    : threads.content[0].thread_id;
      
        if(!threads) { 
          board       = new Threads();
          board.board = req.body.board;
        }

        board.content.unshift({
          thread_id  : num+1,
          text       : req.body.text,
          created_on : new Date().toString(),
          bumped_on  : new Date().toString(),
          reported   : false,
          delete_password : req.body.delete_password,
          replies    : [],
          replycount : 0
        });

        board.save(err => {
          if(err) throw err;
        });
      
    });

    return res.redirect('/b/' + req.body.board +'/')
  };
  
  this.reportThreads = (req, res) => {
   //console.log('reportThreads', req.body, req.params)
    Threads
      .findOne({board: req.params.board })
      .exec((err, board) => {
        if(err) throw err;
        //console.log('board', board);
        let response = 'error';
        board.content.forEach(reply => {

          if(reply.id == req.body.report_id) {
            //console.log('reply', reply)
            if(reply.reported === true) return response = 'This thread has already been reported!';
            reply.reported = true;

            board.save(err => {
              if(err) throw err;
            });

            return response = 'success';
          }   
        });
        return res.send(response);
    });    
  };
  
  this.deleteThreads = (req, res) => {
    //console.log('deleteThreads', req.body, req.params)
    Threads
      .findOne({board: req.params.board})
      .exec((err, board) => {
      if(err) throw err;
      //console.log(thread.content)
      let response = 'incorrect password';
      board.content.forEach( (thread, i) => {
        if(thread._id == req.body.thread_id 
        && thread.delete_password === req.body.delete_password) {  
          //console.log('success!');
          board.content.splice(i, 1);          
          
          board.save(err => {
            if(err) throw err;
          }); 
          
          return response = 'success';
        }; 
      });
      return res.send(response);
    });
  };  
  
  
/*  ///  app.route('/api/replies/:board')  \\\  */  
  
  
  this.showReplies = (req, res) => {
    console.log('showReplies', req.body, req.params, req.query)
    Threads
      .findOne({board: req.params.board})
      .select({'content.reported'               : 0, 
               'content.delete_password'        : 0,
               'content.replies.reported'       : 0,
               'content.replies.delete_password': 0
              })
      .exec( (err, view) => {
        if(err) throw err;
        console.log('show', view)
        view.content.forEach(replies => {
          if(replies._id == req.query.thread_id) {  
            console.log('replies', replies)
            res.json(replies);
          };
        });
    });
  }; 

  this.createReply = (req, res) => {
    //console.log('create reply', req.body, req.params)
    Threads
      .findOne({board : req.params.board})
      .exec( (err, update) => {
        if(err) throw err;
        //console.log(update.content)
        update.content.forEach(content => {
          
          if(content._id == req.body.thread_id) {          
            content.replies.unshift({
              text           : req.body.text,
              created_on     : new Date().toString(),
              reported       : false,
              delete_password: req.body.delete_password  
            });
            
            content.bumped_on   = new Date().toString();
            content.replycount += 1;
          };
        });
      
        update.save(err => {
          if(err) throw err;
        });    
    
    });
    
    return res.redirect('/b/' + req.params.board + '/' + req.body.thread_id);
  };   
  
  this.reportReply = (req, res) => {
    console.log('Report Reply', req.body, req.params)
    Threads
      .findOne({board: req.params.board })
      .exec((err, board) => {
        if(err) throw err;
      
        let response = 'error';
        board.content.forEach(reply => {
          
          if(reply.id == req.body.thread_id) {        
            reply.replies.forEach(val => {
              
              if(val._id == req.body.reply_id) {
                if(reply.reported === true) return response = 'This reply has already been reported!';             
                val.reported = true;
                
                board.save((err, success) => {
                  if(err) throw err;
                });
                
                return response = 'success';
              };
            });
          };
        });
        return res.send(response);
    });
  };     
  
  this.changeReply = (req, res) => {
    
    Threads
      .findOne({ board : req.params.board })  
      .exec((err, reply) => {
        if(err) throw err; 
        
        let response = 'incorrect password'; 
        reply.content.forEach(id => {
          
          if(id._id == req.body.thread_id) {              
            id.replies.forEach(rep => { 
               
              if(rep._id == req.body.reply_id 
              && rep.delete_password == req.body.delete_password) {
                 rep.text       = '[deleted]';
                 rep.created_on = new Date().toString();
                 id.bumped_on   = rep.created_on;
                
                 reply.save((err, success) => {
                   if(err) throw err;
                 }, {new: true});
                
                 return response = 'success';
               };    
             });
          };
        });
        return res.send(response);
    });
  };         
  
};

module.exports = ClickHandler;