import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodedToken {
    userId: number
    username: string
    iat: number
    exp: number
}

declare global {
    namespace Express {
        interface Request {
            user?: { userId: number; username: string }
        }
    }
}

/**
 * @middleware authenticator
 * @description Express middleware to authenticate requests using a JWT Bearer token.
 * 
 * - Expects the token to be provided in the `Authorization` header as: `Bearer <token>`.
 * - Verifies the token using the `JWT_SECRET` environment variable.
 * - Attaches the decoded user information to `req.user` if valid.
 * - Responds with HTTP 401 if the token is missing, malformed, or invalid.
 * 
 * @example
 * router.post('/protected', authenticator, handler)
 * 
 * @param {Request} req - Express request object containing the Authorization header
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} Calls next() if authorized, or responds with 401 Unauthorized
 */
export const authenticator = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authorization header missing or malformed' })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken

        // ✅ Ensure consistent structure for req.user
        req.user = {
            userId: decoded.userId,
            username: decoded.username
        }

        next()
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' })
    }
}
