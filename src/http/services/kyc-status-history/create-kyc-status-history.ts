import { eq } from 'drizzle-orm'
import { db } from '@db/index'
import { kyc, kycStatusHistory } from '@db/schema'
import type { KycStatus } from '@/db/enums'

interface KycStatusHistoryRequest {
  kycId: string
  userId?: string
  status: KycStatus
  remarks?: string
}

export async function createKycStatusHistory({
  status,
  kycId,
  userId,
  remarks,
}: KycStatusHistoryRequest) {
  const [kycExist] = await db.select().from(kyc).where(eq(kyc.id, kycId))

  if (!kycExist) {
    throw new Error('Kyc not found')
  }

  await db.insert(kycStatusHistory).values({
    userId,
    kycId: kycExist.id,
    statusHistory: status,
    remarks,
  })

  return true
}
