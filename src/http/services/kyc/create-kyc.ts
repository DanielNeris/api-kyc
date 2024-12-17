import { eq } from 'drizzle-orm'
import { db } from '@db/index'
import { kyc } from '@db/schema'
import type { MultipartFile } from '@fastify/multipart'
import { KycStatus } from '@/db/enums'
import { createFile } from '../files/create-file'
import { createKycStatusHistory } from '../kyc-status-history/create-kyc-status-history'

interface KycSubmitRequest {
  file: MultipartFile
  userId: string
}

export async function createKyc({ userId, file }: KycSubmitRequest) {
  const [kycExist] = await db.select().from(kyc).where(eq(kyc.userId, userId))

  if (kycExist && kycExist.status !== KycStatus.REJECTED) {
    throw new Error(
      'A KYC process is already in progress or approved for this user'
    )
  }

  const { file: newFile } = await createFile({
    file,
    userId,
  })

  const [newKyc] = await db
    .insert(kyc)
    .values({
      userId,
      fileId: newFile.id,
      status: KycStatus.PENDING,
    })
    .returning()

  await createKycStatusHistory({
    kycId: newKyc.id,
    status: KycStatus.PENDING,
  })

  return true
}
