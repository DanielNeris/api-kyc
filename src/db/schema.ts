import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const files = pgTable('files', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  url: text('url').notNull(),
  tags: text('tags').$type<string[]>(),
  shareableLink: text('shareable_link'),
  views: integer('views').default(0),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
