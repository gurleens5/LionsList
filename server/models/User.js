const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: v => /^[^\s@]+@(my\.)?yorku\.ca$/.test(v),
      message: 'Email must be from @yorku.ca or @my.yorku.ca'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingsCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true }); 


const User = mongoose.model('User', UserSchema);

module.exports = User;