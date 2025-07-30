import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entities/User'
import { Post } from '../entities/Post'
import dotenv from 'dotenv'

dotenv.config()

export class Database {
    
    private static dataSource: DataSource

    /**
     * Initialize and connect to the database.
     * Ensures that only one DataSource is created and reused.
     */
    public static async connect(): Promise<void> {
        if (!Database.dataSource) {
            Database.dataSource = new DataSource({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT) || 3306,
                username: process.env.MYSQL_USERNAME,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                synchronize: true,
                logging: false,
                entities: [User, Post],
            })
        }

        if (!Database.dataSource.isInitialized) {
            await Database.dataSource.initialize()
            console.log('✅ Connected to MySQL via TypeORM')
        }
    }

    /**
     * Get the initialized DataSource instance.
     * 
     * @throws Error if DataSource has not been initialized.
     */
    public static getDataSource(): DataSource {
        if (!Database.dataSource?.isInitialized) {
            throw new Error('Database not initialized. Call Database.connect() first.')
        }
        return Database.dataSource
    }
}
