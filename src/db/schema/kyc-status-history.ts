import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { kyc, users } from '.'
import { KycStatus, kycStatusHistoryEnum } from '../enums'

export const kycStatusHistory = pgTable('kyc_status_history', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  kycId: text('kyc_id')
    .notNull()
    .references(() => kyc.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  status: kycStatusHistoryEnum('kyc_status_history')
    .notNull()
    .default(KycStatus.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  remarks: text('remarks'),
})
