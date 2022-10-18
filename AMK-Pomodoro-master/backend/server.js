/**
 * Express server for our backend framework
 */

const express = require('express')
const path = require('path')
const colors = require('colors')

// Allows the server to have .env file for the configuration of the backend
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')

// Declare the database connection
const connectDB = require('./config/db')

// Variable for the port and the config variable of the port found on the env file
const port = process.env.PORT || 5000

// Run the Database connection
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middleware to get body data from the website
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Server frontend build if you want to use that 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
