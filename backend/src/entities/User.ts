import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm'
import { Post } from './Post'

/**
 * @entity User
 * @description Represents a registered user of the blog system.
 * 
 * Fields:
 * - `id`: Auto-incrementing primary key.
 * - `username`: Unique username for login and identification.
 * - `password`: Hashed password stored as a string.
 * - `posts`: One-to-many relationship linking this user to their blog posts.
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { unique: true })
    username!: string

    @Column('varchar')
    password!: string

    @OneToMany(() => Post, post => post.user)
    posts!: Post[]
}
