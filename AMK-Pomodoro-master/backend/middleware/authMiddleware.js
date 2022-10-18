/**
 * Middleware authentication to protect the routes
 */
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

/**
 * Function for protecting the routes
 */
const protect = asyncHandler(async (req, res, next) => {
  // Initialise the token
  let token

  /**
   * Check the http headers and check in authorization 
   * and check if its a Bearer token
   */
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header and split the bearer into an array so bearer is 0 and the token is 1
      token = req.headers.authorization.split(' ')[1]

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token and finding the user by the token but exclude the password
      req.user = await User.findById(decoded.id).select('-password')

      // Allow next middleware to run
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  // If theres no token throw an error
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
