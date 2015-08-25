var Question = require('./models/question.js');
var User     = require('./models/user.js');
var Response = require('./models/response.js');

var completedRequests = 0, result = [];

module.exports = function(app) {   
  
  app.route('/filterResponses').post(function(req,res){
    var totalCount = 0, filteredResponses = {}, q_id = req.body.qid;
    var completedRequests = 0, result = [];
    var myCallback = function(findObj, i1, i2, res,total){
      var trueFalse = [true,false];
      Response.count(findObj,function(err,count){
        if(err) throw err;
        trueFalse[i2] ? result[i1].positive = count : result[i1].negative = count;
        completedRequests++;
        if(completedRequests == total){
          res.json(result);
          }
       });
    }
    for( var i = 0; i < req.body.queries.length; i++){
      var index = i, q = req.body.queries[i], field = q.field, description = q.description, value = q.val1, value_1 = q.val2;
      result.push({field : field, description : description});
      var trueFalse = [true, false];
      for (var j = 0; j < trueFalse.length; j++){
        var index2 = j;
        var findObj = {"qid":q_id};
        switch (field.toLowerCase()){
          case "user_age": case "age":
            findObj["user_age"] = {$gte : value, $lt : value_1};
            break;
          case "user_state" :
            findObj["user_state"] = value;
            break;
          case "gender" :
            findObj["gender"] = value;
            break;
        } 
        findObj.response = trueFalse[index2];
        myCallback(findObj,index,index2,res,req.body.queries.length*2);
      }
    }
  });
  
  app.get('/getQuestion',function (req, res) {
    Question.find({_id : req.query.id},function(err,result){
      if(err) throw err;
      res.json(result);  
    });
  });
  
  app.get('/getUser',function(req,res){
    User.findOne({_id : req.query.uid},function(err,result){
      if(err) throw err;
      res.json(result);
    });
  });
  
  app.post('/askedQuestions',function(req,res){
    var user = req.body.uid;
    Question.find({asker:user},function(err,resp){
      if(err) throw err;
      res.json(resp);
    });
  });
  
  app.post('/answeredQuestions',function(req,res){
    var user = req.body.uid;
    Response.find({userid:user},function(err,resp){
      if(err) throw err;
      var qids = resp.map(function(item) {return item['qid'];});
      Question.find({_id : {$in : qids}}, function(err2, questions){
        res.json(questions);
      });
    });
  });
  
  
  app.route('/newQuestion').post(function(req,res){
    var q = req.body;
    var newQuestion = new Question({
      _id  : q.id,
      text : q.text,
      tags : [q.tags],
      responses : [q.response1, q.response2]
    });
    
    newQuestion.save(function(err){
      if (err) throw err;
      res.send("new question saved!");
    });
  });
  
  app.route('/newResponse').post(function(req,res){
    var q  = req.body;
    User.findOne({_id:q.uid},function(err,user){
      if(err) throw err;
      var newResponse = new Response({
        timeStamp  : Date.now(),
        userid     : user._id,
        qid        : q.qid,
        user_age   : user.age,
        user_state : user.state,
        gender     : user.gender,
        response   : q.response
      });
      newResponse.save(function(err){
        if(err) throw err;
        res.send("New Response logged!");
      });
    });
  });
  
  

  app.post('/addUser', function(req,res){
    User.count({},function(err,count){
      var userSchema = req.body;
      userSchema._id = count + 1;
      userSchema.password = "wompwomp";
      userSchema.username = userSchema.username.toLowerCase();
      var newUser = new User(userSchema);
      newUser.save(function(err2){
        if(err) throw err;
        res.redirect('/login');
      });
    });
  });
 
  app.post('/login',function(req,res){
    var credentials = req.body;
    var userName = credentials.uid.toLowerCase(), password = credentials.pwd;
    password = "wompwomp";
    User.find({username : userName},function(err,results){
      if(err) throw err;
      if(results.length !== 1){
        res.json({message:"wrongUID"});
      }
      else if (results[0].password !== password){
        res.json({message:"wrongPWD"});
      }
      else{
        res.json({message:"success",uid:results[0]._id});
      }
    });
  });
  
  app.post('/addQuestion', function(req,res){
    Question.count({},function(err,count){
      var questionSchema = req.body;
      questionSchema._id = count + 1;
      Question.find({text:req.body.text},function(err2,results){
        if (err2) throw err2;
        if (results.length > 0){
          res.json({errmsg:"This question is already in the database! Ask another!"});
        }
        else{
          var newQuestion = new Question(questionSchema);
          newQuestion.save(function(err3){
            if(err3) throw err3;
            res.json({success:"true"});
          });
        }
      });
    });
  });
  
  app.get('/getNewQuestion',function(req,res){
    var uid = req.query.uid;    
    Response.find({userid:uid},'qid',function(err,resp){
      if (err) throw err;
      var qids = resp.map(function(item) {return item['qid'];});
      Question.find({_id:{$nin:qids}},function(err2,questions){
        if(err2) throw err2;  
        if(questions.length === 0){
          res.json({errmsg:"You have answered all of our questions. Sorry! Stay tuned for new questions!"});
        }
        else{
          res.json(questions[Math.floor(Math.random()*questions.length)]);
        }
      });
    });
  });
  
  app.get('*', function(req, res) {res.sendfile('./public/views/index.html');});
};
