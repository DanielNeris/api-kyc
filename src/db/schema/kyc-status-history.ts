import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { kyc, users } from '.'
import { KycStatus } from '../enums'

export const kycStatusHistoryEnum = pgEnum('status', [
  KycStatus.APPROVED,
  KycStatus.PENDING,
  KycStatus.REJECTED,
])

export const kycStatusHistory = pgTable('kyc_status_history', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  kycId: text('kyc_id')
    .notNull()
    .references(() => kyc.id),
  userId: text('user_id').references(() => users.id),
  statusHistory: kycStatusHistoryEnum('status')
    .notNull()
    .default(KycStatus.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  remarks: text('remarks'),
})
