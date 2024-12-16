import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { users } from './users'
import { files } from './files'
import { KycStatus, kycStatusEnum } from '../enums'

export const kyc = pgTable('kyc', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  fileId: text('file_id')
    .notNull()
    .references(() => files.id),
  status: kycStatusEnum('status').notNull().default(KycStatus.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
