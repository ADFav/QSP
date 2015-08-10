// app/models/question.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var responseSchema = new Schema({
  timeStamp  : {type : Date,    required : true},
  userid     : {type : Number,  required : true},
  qid        : {type : Number,  required : true},
  user_age   : {type : Number,  required : true},
  user_state : {type : String,  required : true},
  gender     : {type : String,  required : true},
  response   : {type : Boolean, required : true}
});

var Response = mongoose.model('Response', responseSchema);

// make this available to our users in our Node applications
module.exports = Response;