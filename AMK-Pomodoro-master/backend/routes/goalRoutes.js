/**
 * Constant variables are a common JS syntax for modules
 */

// Declare express
const express = require('express')

// Create the router for the REST API  from the controller
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

// Router for the post and get (Create and read)
// Protect protects the routes so data can't be accessed and users can only see their own data
router.route('/').get(protect, getGoals).post(protect, setGoal)

// Router for the delete and update (Update and delete)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router
