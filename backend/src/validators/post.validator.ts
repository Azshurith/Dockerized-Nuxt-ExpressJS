import { body, param } from 'express-validator'
import { Database } from '../config/database'
import { Post } from '../entities/Post'
import { Request, Response, NextFunction } from 'express'

/**
 * Validation rules for creating a blog post.
 *
 * Ensures:
 * - `title`: required, non-empty string
 * - `content`: required, non-empty string
 *
 * @middleware
 */
export const createPostValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required'),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is required'),
]

/**
 * Validation and authorization rules for updating a blog post.
 *
 * Ensures:
 * - `id` param is a valid integer
 * - `title` (optional) is not empty if present
 * - `content` (optional) is not empty if present
 * - The current user is the owner of the post
 * - The found post is attached to `req.post`
 *
 * @middleware
 */
export const updatePostValidation = [
    param('id').isInt().withMessage('Invalid post ID'),

    body('title')
        .optional()
        .trim()
        .notEmpty().withMessage('Title cannot be empty'),

    body('content')
        .optional()
        .trim()
        .notEmpty().withMessage('Content cannot be empty'),

    async (req: Request, res: Response, next: NextFunction) => {
        const postRepo = Database.getDataSource().getRepository(Post)
        const post = await postRepo.findOne({
            where: { id: Number(req.params.id) },
            relations: ['user']
        })

        if (!post) return res.status(404).json({ error: 'Post not found' })
        if (post.user.id !== req.user?.userId) {
            return res.status(403).json({ error: 'You are not the owner of this post' })
        }

        req.post = post
        next()
    }
]

/**
 * Validation and authorization rules for deleting a blog post.
 *
 * Ensures:
 * - `id` param is a valid integer
 * - The current user is the owner of the post
 * - The found post is attached to `req.post`
 *
 * @middleware
 */
export const deletePostValidation = [
    param('id').isInt().withMessage('Invalid post ID'),

    async (req: Request, res: Response, next: NextFunction) => {
        const postRepo = Database.getDataSource().getRepository(Post)
        const post = await postRepo.findOne({
            where: { id: Number(req.params.id) },
            relations: ['user']
        })

        if (!post) return res.status(404).json({ error: 'Post not found' })
        if (post.user.id !== req.user?.userId) {
            return res.status(403).json({ error: 'You are not the owner of this post' })
        }

        req.post = post
        next()
    }
]
