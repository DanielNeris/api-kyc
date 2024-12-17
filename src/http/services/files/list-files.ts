import { db } from '../../../db'
import { files } from '../../../db/schema../../../db/schema'

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
