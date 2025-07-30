import { Post } from '../../entities/Post'

/**
 * Extends the Express Request interface globally.
 *
 * Adds:
 * - `user`: The authenticated user's info extracted from JWT (if logged in)
 * - `post`: The post entity loaded during update/delete operations for ownership validation
 *
 * This declaration enables TypeScript to recognize these properties throughout the app.
 *
 * @example
 * req.user?.userId // Access user ID from token
 * req.post?.title // Access loaded post entity
 */
declare global {
  namespace Express {
    interface Request {
      user?: { userId: number; username: string }
      post?: Post
    }
  }
}
