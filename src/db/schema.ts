import { pgTable, text, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

const userRoles = pgEnum('user_roles', ['admin', 'user'])

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoles('role').notNull(),
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
  shareableLink: text('shareable_link'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
