import express from 'express'
import { login, register } from '../controllers/auth.controller'
import { loginValidation, registerValidation } from '../validators/auth.validator'
import { validator } from '../middlewares/validator'

const router = express.Router()

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 * @body { username: string, password: string }
 * @returns { message: string, user: { id: number, username: string } } on success
 * @returns { error: string } on failure
 */
router.post('/register', registerValidation, validator, register)

/**
 * @route POST /auth/login
 * @desc Login an existing user
 * @access Public
 * @body { username: string, password: string }
 * @returns { token: string } on success
 * @returns { error: string } on invalid credentials or failure
 */
router.post('/login', loginValidation, validator, login)

export default router
