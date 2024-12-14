import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

const client = postgres(env.DATABASE_URL, {
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export const db = drizzle(client, { schema })
