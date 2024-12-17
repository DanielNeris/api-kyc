import { eq } from 'drizzle-orm'
import { db } from '@db/index'
import { kyc } from '@db/schema'

interface getKycRequest {
  userId: string
}

export async function getKyc({ userId }: getKycRequest) {
  const [result] = await db.select().from(kyc).where(eq(kyc.userId, userId))

  return { kyc: result }
}
