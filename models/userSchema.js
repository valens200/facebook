const mongoose = require('mongoose')
const Joi = require('joi')

const Schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First Name can not be empty'],
  },
  lastname: {
    type: String,
    required: [true, 'Last Name can not be empty'],
  },
  email: {
    type: String,
    required: [true, 'Email can not be empty'],
  },
  password: {
    type: String,
    required: [true, 'Password can not be empty'],
  },
  birthday: {
    type: Date,
    required: [true, 'Year can not be empty'],
  },
  followers: {
    type: Array,
    default: [{ type: mongoose.Schema.Types.ObjectId }],
  },
})

const Users = mongoose.model('Users', Schema)

const validateLogin = (user) => {
  const newSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  return newSchema.validate(user)
}
const validate = (user) => {
  const mySchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    birthday: Joi.date()
      .max('01-01-2003')
      .iso()
      .max(new Date())
      .messages({
        'date.format': `Date format is YYYY-MM-DD`,
        'date.max': `Age must be 18+`,
      })
      .message({
        msg: 'invalid date: your date off birth should be in  YYYY-MM-DD',
      })
      .required(),
  })
  return mySchema.validate(user)
}

module.exports = {
  Users,
  validate,
  validateLogin,
}
