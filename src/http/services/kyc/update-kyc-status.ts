import { db } from '../../../db'
import { eq } from 'drizzle-orm'
import { kyc } from '../../../db/schema../../../db/schema'
import { createKycStatusHistory } from '../kyc-status-history/create-kyc-status-history'
import { KycStatus } from '../../../db/enums'

interface UpdateKycStatusRequest {
  kycId: string
  status: KycStatus.APPROVED | KycStatus.REJECTED
  userId?: string
  remarks?: string
}

export async function updateKycStatus({
  kycId,
  status,
  userId,
  remarks,
}: UpdateKycStatusRequest) {
  const [kycExist] = await db.select().from(kyc).where(eq(kyc.id, kycId))

  if (!kycExist) {
    throw new Error('KYC not found')
  }

  if (kycExist.status === KycStatus.APPROVED) {
    throw new Error('KYC is already approved')
  }

  await db
    .update(kyc)
    .set({
      status,
      remarks,
      updatedAt: new Date(),
    })
    .where(eq(kyc.id, kycId))

  await createKycStatusHistory({
    kycId,
    status,
    userId,
    remarks: status === KycStatus.REJECTED ? remarks : undefined,
  })

  return true
}
