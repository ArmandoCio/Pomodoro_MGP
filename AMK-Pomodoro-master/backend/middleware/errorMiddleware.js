/**
 * Middleware to overwrite the default express error handler
 */
const errorHandler = (err, req, res, next) => {
  // Whatever is set on the controller will use that error else use error 500
  const statusCode = res.statusCode ? res.statusCode : 500

  // Set the status code
  res.status(statusCode)

  /**
   * Respond with a json that passes a message and a stack trace which will be shown only when the 
   * config variable in the .env is set to development
   */
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = {
  errorHandler,
}
