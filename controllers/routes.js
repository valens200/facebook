const express = require('express')
const router = express.Router()
const {
  landing,
  post,
  login,
  getUsers,
  addFriend,
  yourfollowers,
  getFreinds,
} = require('./apis')
const { newMessage, message, Getmessages } = require('./messagesApis')

router.get('/', landing)
router.post('/register', post)
router.post('/login', login)
router.get('/friends', getUsers)
router.post('/addfriend/:id/:id1', addFriend)
router.get('/followers/:id', yourfollowers)
router.get('/follwersNames/:id', getFreinds)
router.post('/message/:id/:id1', newMessage)
router.get('/m', message)
router.get('/chart/:id/:id1', Getmessages)
module.exports = router
