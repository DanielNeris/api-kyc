import { kyc } from '@/db/schema'
import { db } from '@db/index'
import { desc } from 'drizzle-orm'

export async function listKyc() {
  const kycs = await db.select().from(kyc).orderBy(desc(kyc.createdAt))

  return { kycs }
}
