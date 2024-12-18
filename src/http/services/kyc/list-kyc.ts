import { kyc, users, files } from '../../../db/schema'
import { db } from '../../../db'
import { desc, eq } from 'drizzle-orm'

export async function listKyc() {
  const kycs = await db
    .select({
      id: kyc.id,
      status: kyc.status,
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
    .leftJoin(users, eq(kyc.userId, users.id))
    .leftJoin(files, eq(kyc.fileId, files.id))
    .orderBy(desc(kyc.createdAt))

  return { kycs }
}
