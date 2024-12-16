import { db } from '@db/index'
import { files } from '@db/schema'

export async function listFiles() {
  const userFiles = await db.select().from(files)

  return {
    files: userFiles.map(file => ({
      id: file.id,
      filename: file.filename,
      originalName: file.originalName,
      type: file.type,
      url: file.url,
      shareableLink: file.shareableLink,
      createdAt: file.createdAt,
    })),
  }
}
