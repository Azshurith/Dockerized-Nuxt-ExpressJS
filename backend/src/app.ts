/**
 * Entry Point for Express Server
 *
 * - Loads environment variables
 * - Initializes middleware (CORS, JSON body parser)
 * - Connects and initializes TypeORM with the database
 * - Mounts API routes under /api
 * - Starts the HTTP server
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import { Database } from './config/database' // <- new TypeORM wrapper

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to the database using TypeORM
Database.connect()
  .then(() => {
    console.log('✅ Database connected via TypeORM')

    // Mount all routes under /api
    app.use('/api', routes)

    // Start server
    const PORT = process.env.EXPRESS_PORT || 4000
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Failed to connect to database:', err)
  })
