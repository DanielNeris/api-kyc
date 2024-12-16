import { eq } from 'drizzle-orm'
import { db } from '@db/index'
import { files } from '@db/schema'

interface ListFileRequest {
  userId: string
}

export async function listFiles({ userId }: ListFileRequest) {
  const userFiles = await db
    .select()
    .from(files)
    .where(eq(files.userId, userId))

  return {
    files: userFiles.map(file => ({
      id: file.id,
      filename: file.filename,
      originalName: file.originalName,
      type: file.type,
      url: file.url,
      tags: file.tags,
      views: file.views,
      shareableLink: file.shareableLink,
      createdAt: file.createdAt,
    })),
  }
}
