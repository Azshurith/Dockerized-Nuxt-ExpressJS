import { body } from 'express-validator'
import { Database } from '../config/database'
import { User } from '../entities/User'

/**
 * Validation rules for user login.
 *
 * Ensures:
 * - `username`: required, non-empty string
 * - `password`: required, non-empty string
 *
 * @middleware
 * @example
 * router.post('/auth/login', loginValidation, validate, login)
 */
export const loginValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required'),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required'),
]

/**
 * Validation rules for user registration.
 *
 * Ensures:
 * - `username`: required, at least 3 characters, must be unique
 * - `password`: required, at least 6 characters
 *
 * Also checks if the username is already taken in the database.
 *
 * @middleware
 * @example
 * router.post('/auth/register', registerValidation, validate, register)
 */
export const registerValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .custom(async (value) => {
            const userRepo = Database.getDataSource().getRepository(User)
            const existing = await userRepo.findOneBy({ username: value })
            if (existing) {
                throw new Error('Username already taken')
            }
            return true
        }),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]
