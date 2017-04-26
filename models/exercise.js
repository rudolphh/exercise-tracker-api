'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({

  username: String,
  userId : {
    type: String,
    required: true,
    ref: 'User'
  },
  description: {
    type: String,
    required: true,
    maxlength: [30, 'description is too long']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'duration is too short']
  },
  date: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model('Exercise', exerciseSchema);
