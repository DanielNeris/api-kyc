import { eq } from 'drizzle-orm'
import { db } from '@db/index'
import { files } from '@db/schema'

interface ListFileRequest {
  id: string
}

export async function shareFile({ id }: ListFileRequest) {
  const [file] = await db.select().from(files).where(eq(files.id, id))

  if (!file) {
    throw new Error('File not found')
  }

  const [result] = await db.select().from(files).where(eq(files.id, file.id))

  return {
    url: result.url,
  }
}
