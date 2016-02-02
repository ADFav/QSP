// app/models/question.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var responseSchema = new Schema({
  timeStamp  : {type : Date,    required : true},
  userid     : {type : Number,  required : true},
  qid        : {type : Number,  required : true},
  user_age   : {type : Number,  required : true},
  user_state : {type : String,  required : true},
  gender     : {type : String,  required : true},
  response   : {type : Boolean}
});

var Response = mongoose.model('Response', responseSchema);
module.exports = Response;