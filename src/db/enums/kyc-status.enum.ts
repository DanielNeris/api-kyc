import { pgEnum } from 'drizzle-orm/pg-core'

export enum KycStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export const kycStatusEnum = pgEnum('status', [
  KycStatus.APPROVED,
  KycStatus.PENDING,
  KycStatus.REJECTED,
])

export const kycStatusHistoryEnum = pgEnum('kyc_status_history', [
  KycStatus.APPROVED,
  KycStatus.PENDING,
  KycStatus.REJECTED,
])
