import { kyc } from '@/db/schema'
import { db } from '@db/index'

export async function listKyc() {
  const kycs = await db.select().from(kyc)

  return { kycs }
}
