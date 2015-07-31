// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called

var userSchema = new Schema({
  _id      : {type : Number, required : true},
  username : {type : String, required : true},
  password : {type : String, required : true},
  age      : {type : Number, required : true},
  state    : {type : String, required : true},
  gender   : {type : String, required : true}
});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;