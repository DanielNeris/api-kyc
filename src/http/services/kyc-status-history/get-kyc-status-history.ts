import { desc, eq } from 'drizzle-orm'
import { db } from '@db/index'
import { kyc, kycStatusHistory } from '@db/schema'

interface KycStatusHistoryRequest {
  kycId: string
}

export async function getKycStatusHistory({ kycId }: KycStatusHistoryRequest) {
  const [kycExist] = await db.select().from(kyc).where(eq(kyc.id, kycId))

  if (!kycExist) {
    throw new Error('Kyc not found')
  }

  const kycHistory = await db
    .select()
    .from(kycStatusHistory)
    .where(eq(kycStatusHistory.kycId, kycId))
    .orderBy(desc(kycStatusHistory.createdAt))

  return { kycHistory }
}
