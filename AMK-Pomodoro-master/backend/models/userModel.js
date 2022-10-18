/**
 * User Model for the users on the website
 */
const mongoose = require('mongoose')

/**
 * User fields that we want to use
 */
const userSchema = mongoose.Schema(
  {
    /**
     * Name field,
     * email field,
     * password field
     */
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
