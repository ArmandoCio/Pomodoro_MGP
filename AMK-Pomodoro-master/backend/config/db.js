/**
 * File for connecting to MongoDB using mongoose
 */
const mongoose = require('mongoose')

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Variable that gets the MONGO_URI from the env file
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // Console log with cyan color, connection host is shown
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    // Log any errors that occus
    console.log(error)
    // Exit with failure which is 1
    process.exit(1)
  }
}

module.exports = connectDB
