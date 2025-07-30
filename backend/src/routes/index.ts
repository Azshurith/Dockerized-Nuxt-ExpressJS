import express from 'express'
import authRoutes from './auth'
import postRoutes from './posts'

const router = express.Router()

/**
 * Root API Router
 * 
 * Mounts and organizes all route modules.
 * Each module handles a specific concern such as authentication or blog post management.
 * 
 * @route /auth   Handles user authentication (register, login)
 * @route /posts  Handles CRUD operations for blog posts
 */
router.use('/auth', authRoutes)
router.use('/posts', postRoutes)

export default router
