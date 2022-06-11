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

router.get('/', landing)
router.post('/register', post)
router.post('/login', login)
router.get('/friends', getUsers)
router.post('/addfriend/:id/:id1', addFriend)
router.get('/followers/:id', yourfollowers)
router.get('/follwersNames/:id', getFreinds)
module.exports = router
