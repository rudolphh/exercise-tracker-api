'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [ 3, 'username should be at least 3 characters long'],
    maxlength: [ 25, 'username cannot be more than 25 characters']
  },
  _id: {
    type: String,
    default: shortid.generate
  }
});

// instead of const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);
