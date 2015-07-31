// app/models/question.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var questionSchema = new Schema({
  _id  : {type : Number, required : true},
  text : {type : String, required : true},
  tags : [String],
  responses : [String]
});

var Question = mongoose.model('Question', questionSchema);

// make this available to our users in our Node applications
module.exports = Question;