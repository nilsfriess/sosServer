let mongoose = require('mongoose')
let Schema = mongoose.Schema

let GuestbookSchema = new Schema({
  name: {
    type: String,
    required: 'Name of sender is required'
  },
  date: {
    type: Date,
    default: Date.now
  },
  mail: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'eMail of sender is required'
  }, 
  message: {
   type: String,
   required: 'Message of sender is required'
  }
})

module.exports = mongoose.model('GuestbookEntry', GuestbookSchema)