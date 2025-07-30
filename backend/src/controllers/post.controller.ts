import { Request, Response } from 'express';
import { Database } from '../config/database';
import { Post } from '../entities/Post';
import { User } from '../entities/User';

/**
 * Get all blog posts.
 * 
 * @route GET /api/posts
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} JSON array of posts with authors
 */
export const getAllPosts = async (_req: Request, res: Response): Promise<Response> => {
    const postRepo = Database.getDataSource().getRepository(Post);
    const posts = await postRepo.find({
        relations: ['user'],
        select: {
            id: true,
            title: true,
            content: true,
            user: {
                id: true,
                username: true
            }
        },
        order: { id: 'DESC' }
    });
    return res.json(posts);
};

/**
 * Get a single post by its ID.
 * 
 * @route GET /api/posts/:id
 * @param {Request} req - Express request object with `id` param
 * @param {Response} res - Express response object
 * @returns {Response} JSON of post with author or error message
 */
export const getPostById = async (req: Request, res: Response): Promise<Response> => {
    const postRepo = Database.getDataSource().getRepository(Post);
    const post = await postRepo.findOne({
        where: { id: Number(req.params.id) },
        relations: ['user'],
        select: {
            id: true,
            title: true,
            content: true,
            user: {
                id: true,
                username: true
            }
        },
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json(post);
};

/**
 * Create a new post.
 * 
 * @route POST /api/posts
 * @param {Request} req - Express request object with `title`, `content`, and `userId` in body
 * @param {Response} res - Express response object
 * @returns {Response} JSON of newly created post
 */
export const createPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, content } = req.body;
        const userId = req.user?.userId;

        if (!title || !content || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userRepo = Database.getDataSource().getRepository(User);
        const postRepo = Database.getDataSource().getRepository(Post);

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const post = postRepo.create({ title, content, user });
        await postRepo.save(post);

        return res.status(201).json(post);
    } catch (error) {
        console.error('Failed to create post:', error);
        return res.status(500).json({ error: 'Failed to create post' });
    }
};

/**
 * Update a post by its ID.
 * 
 * @route PUT /api/posts/:id
 * @param {Request} req - Express request object with `id` param and updated `title`/`content` in body
 * @param {Response} res - Express response object
 * @returns {Response} JSON of updated post or error
 */
export const updatePost = async (req: Request, res: Response): Promise<Response> => {
    const { title, content } = req.body;
    const userId = req.user?.userId;
    const postRepo = Database.getDataSource().getRepository(Post);

    const post = await postRepo.findOne({
        where: { id: Number(req.params.id) },
        relations: ['user']
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user.id !== userId) {
        return res.status(403).json({ error: 'You are not the owner of this post' });
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;

    await postRepo.save(post);
    return res.json(post);
};

/**
 * Delete a post by its ID.
 * 
 * @route DELETE /api/posts/:id
 * @param {Request} req - Express request object with `id` param
 * @param {Response} res - Express response object
 * @returns {Response} 204 No Content or error message
 */
export const deletePost = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const postRepo = Database.getDataSource().getRepository(Post);

    const post = await postRepo.findOne({
        where: { id: Number(req.params.id) },
        relations: ['user']
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user.id !== userId) {
        return res.status(403).json({ error: 'You are not the owner of this post' });
    }

    await postRepo.remove(post);
    return res.status(204).send();
};
