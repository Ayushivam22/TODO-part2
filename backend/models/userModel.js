import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  password:{
    type:String,
    require:true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
