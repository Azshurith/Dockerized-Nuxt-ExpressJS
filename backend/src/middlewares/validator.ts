import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

/**
 * @middleware validator
 * @description Middleware to handle validation errors from express-validator.
 * 
 * This middleware should be placed after express-validator validation rules.
 * If any validation errors are present, it responds with a 400 status and a
 * JSON object containing the array of validation error messages.
 * 
 * @example
 * router.post('/example', validationRules, validator, controllerHandler)
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Response|void} 400 response with errors or calls next middleware
 */
export const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}
