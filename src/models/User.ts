import mongoose from "mongoose";  
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email:{
    type: String,
    required: true, 
    unique: true,
        lowercase: true,

  },
  password:{
    type:String,
    required: true,
    minlength: 6,
  },
  role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},{
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);;
    next();
  }});

  export default mongoose.models.User || mongoose.model('User', userSchema);
