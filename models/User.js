const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password:{
      type:String,
      required:true,
  }
});
//use function instead of arrow to get this parameter 

UserSchema.pre('save',function(next){
  const user = this;
  bcrypt.hash(user.password,10,(error,hash)=>{
    user.password = hash;
    next();//move to next middleware
  });
})

const User = mongoose.model('User', UserSchema);
module.exports = User;