import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import { connectionBD } from './database/config.js'
import { router as usersRouter } from './routes/users.js'

dotenv.config()

// Create express server
const app = express()

// Database
connectionBD()

// CORS
app.use(cors())

// Public directory
app.use(express.static('public'))

// Reading and parsing the body
app.use(express.json())

// Routes
app.use('/api/auth', usersRouter)

// Listen to requests
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
