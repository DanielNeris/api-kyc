import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { users } from './users'

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
