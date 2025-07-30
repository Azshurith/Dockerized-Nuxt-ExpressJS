import express from 'express'
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.controller'
import {
    createPostValidation,
    updatePostValidation,
    deletePostValidation
} from '../validators/post.validator'
import { authenticator } from '../middlewares/authenticator'
import { validator } from '../middlewares/validator'

const router = express.Router()

/**
 * @route GET /posts
 * @desc Retrieve all blog posts
 * @access Public
 * @returns {Array<Post>} List of posts
 */
router.get('/', getAllPosts)

/**
 * @route GET /posts/:id
 * @desc Retrieve a specific post by ID
 * @access Public
 * @params { id: number }
 * @returns {Post} The matching post or 404 if not found
 */
router.get('/:id', getPostById)

/**
 * @route POST /posts
 * @desc Create a new blog post
 * @access Protected
 * @body { title: string, content: string }
 * @returns {Post} The newly created post
 */
router.post('/', authenticator, createPostValidation, validator, createPost)

/**
 * @route PUT /posts/:id
 * @desc Update an existing blog post by ID
 * @access Protected (Author only)
 * @params { id: number }
 * @body { title?: string, content?: string }
 * @returns {Post} The updated post or 404 if not found
 */
router.put('/:id', authenticator, updatePostValidation, validator, updatePost)

/**
 * @route DELETE /posts/:id
 * @desc Delete a blog post by ID
 * @access Protected (Author only)
 * @params { id: number }
 * @returns { void } 204 No Content on success, or 404 if not found
 */
router.delete('/:id', authenticator, deletePostValidation, validator, deletePost)

export default router
