/* eslint-disable import/first */
import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

import { connectionBD } from './database/config.js'
import { router as authRouter } from './routes/auth.js'

// Create express server
const app = express()

// Database
connectionBD()

// Public directory
app.use(express.static('public'))

// Reading and parsing the body
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)

// Listen to requests
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
