const express = require('express')
require('dotenv').config()

// Create express server
const app = express()

// Public directory
app.use(express.static('public'))

// Reading and parsing the body
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))

// Listen to requests
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
