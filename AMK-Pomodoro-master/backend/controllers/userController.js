/**
 * User controller using a REST API 
 * 
 * Initialise variables for jwt, bcrypt, async and User
 * 
 * JWT is used to validate a user 
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Get the name, email and password from the frontend
  const { name, email, password } = req.body

  /**
   * Validation for fields 
   * If none are included throw an error
   */
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if the user exists
  const userExists = await User.findOne({ email })

  // If the user exists throw an error
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash the password with bcrypt
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  /**
   * Check if the user was created
   * 
   */
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // Get the name, email and password from the frontend
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  /**
   * Check the password of the user with a bcrypt method to 
   * compare the plain text password with the hashed password
   * on the database
   * 
   * else throw an error for invalid credentials
   */
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
/**
 * Protect the routes 
 */
const getMe = asyncHandler(async (req, res) => {
  /**
   * Add here any info about the user
   */
  res.status(200).json(req.user)
})

// Generate JWT 
const generateToken = (id) => {
  /**
   * Sign the payload/data using the JWT secret 
   * It will currently expire in 30 days
   * 
   */
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
