/**
 * Goal model for the resources from the website which in this case
 * will be for the goals on the website
 */

const mongoose = require('mongoose')

/**
 * Create the goal schema 
 */
const goalSchema = mongoose.Schema(
  {
    // associate the goal with a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // Text field for the goal of type string
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    // Automatic updated and created at field
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema)
