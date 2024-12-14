import { eq } from 'drizzle-orm'
import { db } from '../db'
import { files } from '../db/schema'

interface ListFileRequest {
  id: string
}

export async function shareFile({ id }: ListFileRequest) {
  const [file] = await db.select().from(files).where(eq(files.id, id))

  if (!file) {
    throw new Error('File not found')
  }

  const [views] = await db
    .update(files)
    .set({ views: (file.views ?? 0) + 1 })
    .where(eq(files.id, file.id))
    .returning()

  return {
    url: file.url,
    views: views.views,
  }
}
