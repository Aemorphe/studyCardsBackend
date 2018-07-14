import mongoose, { Schema } from 'mongoose';

// define cardSet Schema
const cardSetSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subject: String,
  cards: Array
});

// export Mongoose model
let CardSet = mongoose.model('CardSet', cardSetSchema);
module.exports=CardSet;
