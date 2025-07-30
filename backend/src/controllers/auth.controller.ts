import { Request, Response } from 'express'
import { Database } from '../config/database'
import { User } from '../entities/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/**
 * Handle user login request.
 *
 * @route POST /auth/login
 * @param {Request} req - Express request object containing `username` and `password` in the body
 * @param {Response} res - Express response object
 * @returns {Response} JSON with JWT token or error message
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body
        const userRepo = Database.getDataSource().getRepository(User)

        const user = await userRepo.findOneBy({ username })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )

        return res.json({ token })
    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ error: 'Login failed' })
    }
}

/**
 * Handle user registration request.
 *
 * @route POST /auth/register
 * @param {Request} req - Express request object with validated `username` and `password`
 * @param {Response} res - Express response object
 * @returns {Response} JSON with created user info or error message
 */
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body
        const userRepo = Database.getDataSource().getRepository(User)

        const existing = await userRepo.findOneBy({ username })
        if (existing) {
            return res.status(409).json({ error: 'Username already exists' })
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = userRepo.create({ username, password: hashed })
        await userRepo.save(user)

        return res.status(201).json({
            message: 'User created',
            user: {
                id: user.id,
                username: user.username
            }
        })
    } catch (err) {
        console.error('Registration error:', err)
        return res.status(500).json({ error: 'Something went wrong during registration' })
    }
}
