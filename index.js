import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import { connectionBD } from './database/config.js'
import { router as usersRouter } from './routes/users.js'
import { router as eventsRouter } from './routes/events.js'

// directory-name 👇️
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

// Create express server
const app = express()

// Database
connectionBD()

// CORS
app.use(cors())

// Public directory
app.use(express.static(path.join(__dirname, 'public')))

// Reading and parsing the body
app.use(express.json())

// Routes
app.use('/api/auth', usersRouter)
app.use('/api/events', eventsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'))
})

// Listen to requests
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
