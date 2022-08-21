const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Pasword: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Role: {
    type: String,
    default: 'user',
  },
})

const User = mongoose.model('user', userSchema)
module.exports = User
