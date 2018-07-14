const mongoose = require('mongoose');
const { Schema } = require('mongoose')

// define user Schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// export Mongoose model
let User = mongoose.model('User', userSchema);
module.exports=User;
