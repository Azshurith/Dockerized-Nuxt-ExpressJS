import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm'
import { User } from './User'

/**
 * @entity Post
 * @description Represents a blog post created by a user.
 * 
 * Fields:
 * - `id`: Auto-incrementing primary key.
 * - `title`: Title of the blog post.
 * - `content`: Main body content of the blog post.
 * - `user`: The user who authored the post. Many-to-one relationship.
 * 
 * Behavior:
 * - If the associated user is deleted, all their posts are also deleted (`CASCADE`).
 */
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar')
    title!: string

    @Column('text')
    content!: string

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    user!: User
}
