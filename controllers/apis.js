const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const tokenParser = require('token-parser')
const bcrypt = require('bcrypt')
const emailExistence = require('email-existence')
const { validate, Users, validateLogin } = require('../models/userSchema')

const landing = (req, res) => {
  res.send('well come here')
}
const post = async (req, res) => {
  try {
    const { firstname, lastname, email, birthday, password } = req.body
    const { error } = validate(req.body)
    if (error) {
      return res.status(400).json(error.details[0].message)
    }

    //checking whether the user is available

    const isAvailable = await Users.findOne({ email })
    if (isAvailable) {
      return res.status(400).json('user already registered please login')
    }

    //creating new user
    const newUser = await Users.create(req.body)
    const pass = await bcrypt.hash(newUser.password, 10)
    newUser.password = pass
    if (!newUser) {
      return res.status(500).json('some thing went wrong please try again')
    }
    const AccessToken = jwt.sign(
      { id_: newUser._id, email: newUser.email },
      process.env.privatekey,
      { expiresIn: '10d' },
    )
    res.cookie('AccessToken', AccessToken, {
      expire: new Date() * 10000,
    })
    res.json(newUser)
  } catch (err) {
    console.log(err)
  }
}

//logging in
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { error } = validateLogin(req.body)
    console.log(req.body)
    if (error) {
      return res.status(400).json('Invalid inpusts all field are required')
    }
    const isAuthenticated = Users.findOne({ email })
    if (!isAuthenticated) {
      return res.status(400).json(isAuthenticated)
    }

    console.log(isAuthenticated.password)
    const isValid = await bcrypt.compare(password, isAuthenticated.password)
    if (!isValid) return res.status(400).json('Invalid email or password')
    const AccessToken = jwt.sign(
      { id: isAuthenticated._id, email: isAuthenticated.email },
      process.env.privatekey,
      { expiresIn: '10d' },
    )
    res.cookie('AccessToken', AccessToken, {
      expire: new Date().getHours() + 10 + 'd',
    })
    res.json(AccessToken)
  } catch (err) {
    console.log(err)
  }
}

const getUsers = async (req, res) => {
  const users = await Users.find({})
  if (!users) return res.status(404).json('no users found')
  return res.status(400).send(users)
}

//add friends

const addFriend = async (req, res) => {
  try {
    const current_user = await Users.findOne({ _id: req.params.id })
    if (!current_user) {
      return res.status(400).json('failed')
    } else {
      var freind = await Users.findById({ _id: req.params.id })
      var length = freind.followers.length
      console.log(length + 1)
      const followers = freind.followers
      const newFollowers = [...followers, { id: current_user.firstname }]
      freind.followers = newFollowers
      await freind.save()
      console.log(length)
      res.json(freind)
    }
  } catch (err) {
    console.log(err)
  }
}
//Api tio get followers who follows you;

const yourfollowers = async (req, res) => {
  try {
    const user = await Users.find({ _id: req.params.id })
    res.json('you have  ' + user[0].followers.length + '  friends ')
  } catch (err) {
    console.log(err)
  }
}

const getFreinds = async (req, res) => {
  try {
    var i
    const user = await Users.find({ _id: req.params.id })
    if (!user) return res.status(404).json('user not found')
    res.json(user[0].followers)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  landing,
  post,
  login,
  getUsers,
  addFriend,
  yourfollowers,
  getFreinds,
}
