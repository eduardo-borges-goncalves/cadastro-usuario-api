const mongoose = require('mongoose')

const User = mongoose.model('User', {
  name: String,
  age: String,
  language: String,
  operationArea: String, 
  professionalSituation: String, 
  experience: Boolean, 
  linkedin: String, 
  github: String
})

module.exports = User