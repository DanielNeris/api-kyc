import { desc, eq } from 'drizzle-orm'
import { db } from '../../../db'
import {
  files,
  kyc,
  kycStatusHistory,
  users,
} from '../../../db/schema../../../db/schema'

interface getKycRequest {
  userId: string
}

export async function getKyc({ userId }: getKycRequest) {
  const [result] = await db
    .select({
      id: kyc.id,
      status: kyc.status,
      remarks: kyc.remarks,
      createdAt: kyc.createdAt,
      updatedAt: kyc.updatedAt,
      user: {
        id: users.id,
        email: users.email,
        fullName: users.fullName,
      },
      file: {
        id: files.id,
        url: files.url,
      },
    })
    .from(kyc)
    .where(eq(kyc.userId, userId))
    .leftJoin(users, eq(kyc.userId, users.id))
    .leftJoin(files, eq(kyc.fileId, files.id))
    .leftJoin(kycStatusHistory, eq(kycStatusHistory.kycId, kyc.id))
    .orderBy(desc(kyc.createdAt))
  return { kyc: result }
}
