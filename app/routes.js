var Question = require('./models/question.js');
var User     = require('./models/user.js');
var Response = require('./models/response.js');

module.exports = function(app) {
  app.get('/test', function(req, res) {
    res.sendfile('./public/views/test.html'); 
  // load our public/index.html file
  });
  
  app.route('/questions').get(function (req, res) {
    var question = Question.find({_id : req.query.id},function(err,result){
      res.json(result);  
    });
  });
  
  app.route('/questionTest').get(function(req,res){
    var uid = req.query.uid;
    Response.find({userid : uid},"qid",function(err,results){
      if(err) throw err;
      res.json(results);
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
    console.log(q);
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
      })
    });
  });
  
  app.route('/filterResponses').get(function(req,res){
    var q = req.query;
    var q_id = q.qid,
        field = q.field,
        value = q.value,
        value_1 = q.value_1;
    var findObj = {};
    console.log(parseInt(q.qid));
    switch (field){
      case "user_age" : 
        findObj = {"qid":q_id, "user_age": {$gte : value, $lt : value_1}};
        break;
      case "user_state" :
        findObj = {"qid":q_id, "user_state":value};
        break;
      case "gender" :
        findObj = {"qid":q_id, "gender":value};
        break;
      default :
        findObj = {"qid":q_id};
    }
    console.log(findObj);
    countCount = 0;
    var respObj = {positive: 0, negative: 0, total: 0};
    
    findObj.response = true;
    Response.count(findObj,function(err,count){
      if(err) throw err;
      respObj.positive = count;
      countCount++;
      if (countCount === 2){
        respObj.total = respObj.positive + respObj.negative;
        res.json(respObj);
      }
    });
    findObj.response = false;
    Response.count(findObj,function(err,count){
      if(err) throw err;
      respObj.negative = count;
      countCount++;
      if (countCount === 2){
        respObj.total = respObj.positive + respObj.negative;
        res.json(respObj);
      }
    });
  });
  
  app.get('/stats*', function(req, res) {
    res.sendfile('./public/views/stats.html');     
    // load our public/index.html file
  });
  
  app.get('/addUser', function(req,res){
    res.sendfile('./public/views/addUser.html')
  });
  
  app.post('/addUser', function(req,res){
    User.count({},function(err,count){
      var userSchema = req.body;
      userSchema._id = count+1;
      var newUser = new User(userSchema);
      newUser.save(function(err2){
        if(err) throw err;
        res.send("Question added to the database");
      });
    });
  });
 
    app.get('/addQuestion', function(req,res){
    res.sendfile('./public/views/addQuestion.html')
  });
  
  app.post('/addQuestion', function(req,res){
    Question.count({},function(err,count){
      var questionSchema = req.body;
      questionSchema._id = count+1;
      var newQuestion = new Question(questionSchema);
      
      newQuestion.save(function(err2){
        if(err) throw err;
        res.send("Question added to the database");
      });
    });
  });
  
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');     
    // load our public/index.html file
  });
};