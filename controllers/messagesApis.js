const mongoose = require('mongoose')
const Message = require('../models/messagesSchema')

const newMessage = async (req, res) => {
  const senderId = req.params.id
  const receiverId = req.params.id1
  const message = req.body.message
  //   if (!message || message == '') {
  //     return res.status(404).json('Message can not be empty')
  //   }
  console.log(message)
  try {
    const newMessage = await Message.create({
      message,
      senderId,
      receiverId,
    })
    if (!newMessage) return res.status(404).json('Message not sent')
    return res.status(200).json(newMessage)
  } catch (err) {
    console.log(err)
  }
}
const message = async (req, res) => {
  res.status(200).json(await Message.find({}))
}

const Getmessages = async (req, res) => {
  try {
    // const messages = await Message.find({ senderId: req.params.id })
    const messages = await Message.find({
      $and: [{ senderId: req.params.id }, { receiverI: req.params.id1 }],
    })
    if (!messages) return res.status(404).json('No converstion yet!')
    res.json(messages)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { newMessage, message, Getmessages }
