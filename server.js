const dotenv = require("dotenv")
dotenv.config()

const path = require("path")
const app = require("./app")
const cloudinary = require("cloudinary").v2
const connectDatabase = require("./config/database")

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log("Shutting down the server due to Uncaught Exception")
  process.exit(1)
})

// Connect to database
connectDatabase()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Start the server
const PORT = process.env.PORT || 8000
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  console.log("Shutting down the server due to Unhandled Promise Rejection")
  server.close(() => {
    process.exit(1)
  })
})
