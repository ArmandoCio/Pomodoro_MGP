/**
 * Routes for the user
 */
const express = require('express')
const router = express.Router()
/**
 * Bring in the user controller
 */
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
// Protect getMe so no direct access to a user with a Bearer JWT
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
