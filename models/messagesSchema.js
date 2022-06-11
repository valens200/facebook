const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
