/**
 * Part of one of the controllers for the REST API
 * 
 * Goal controller that contains
 * CRUD functions for the goal routes
 * 
 * Async is added to the functions for when mongoose is used
 * in the database connection to make sure a promise is returned
 * in other words an eventual completion of an asynchronous operation
 * which is what the database connection is.
 * 
 * Express Async handler is used to cut down on using try catches for the async 
 * logic which makes use of express default error handling
 */
const asyncHandler = require('express-async-handler')


/**
 * Constant for the goal model which allows for mongoose 
 * methods to create, read, update or delete data on the MongoDB
 * Database
 *  
 */ 
const Goal = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  // Read the goal by the user only
  const goals = await Goal.find({ user: req.user.id })

  // Return the goals
  res.status(200).json(goals)
})

// @desc    Set goal (Create the goal)
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  //Error handling for the text field
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  // Create the goal and get it from the body (website)
  // Identify it by user
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  // Get the goals id from the database
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Update the goal
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  // Return the updated goal
  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  // Get the goals id from the database
  const goal = await Goal.findById(req.params.id)

  // If goal doesn't exist
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  // Return the id for the frontend
  res.status(200).json({ id: req.params.id })
})

// Export the methods
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
