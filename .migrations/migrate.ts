import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import 'dotenv/config'

import { env } from '../src/env'

async function runMigration() {
  console.log('Migration started ⌛')

  const dbUrl = (
    env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_URL
  ) as string

  if (!dbUrl) throw new Error('No database url found')

  const client = postgres(dbUrl, {
    max: 1,
    // SSL must be `require`. `true` or `verify-full` do not work since Railway uses self-signed certificates.
    ssl: process.env.NODE_ENV === 'production' ? 'require' : undefined,
  })

  const db = drizzle(client)
  try {
    await migrate(db, { migrationsFolder: './.migrations/migrations' })
    console.log('Migration completed ✅')
  } catch (error) {
    console.error('Migration failed 🚨:', error)
  } finally {
    await client.end()
  }
}

runMigration().catch(error =>
  console.error('Error in migration process 🚨:', error)
)
