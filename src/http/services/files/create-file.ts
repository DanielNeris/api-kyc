import type { MultipartFile } from '@fastify/multipart'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { files } from '../../../db/schema../../../db/schema'
import { db } from '../../../db'
import { env } from '../../../env'

interface FileRequest {
  file: MultipartFile
  userId: string
}

export async function createFile({ file, userId }: FileRequest) {
  const allowedTypes = [
    'image/jpeg', // .jpeg, .jpg
    'image/png', // .png
    'image/gif', // .gif
    'image/bmp', // .bmp
    'image/tiff', // .tiff
  ]

  if (!file || !allowedTypes.includes(file.mimetype)) {
    throw new Error('Only images are allowed')
  }

  const uploadDir = path.resolve(__dirname, '..', '..', '..', '..', 'uploads')
  await fs.promises.mkdir(uploadDir, { recursive: true })

  const timestamp = Date.now()
  const randomString = crypto.randomUUID().slice(0, 12)
  const fileExtension = path.extname(file.filename)
  const uniqueName = `${timestamp}-${randomString}${fileExtension}`
  const uploadPath = path.join(uploadDir, uniqueName)

  await fs.promises.writeFile(uploadPath, await file.toBuffer())

  const [insertedFile] = await db
    .insert(files)
    .values({
      userId,
      filename: uniqueName,
      originalName: file.filename,
      type: file.mimetype,
      url: `${env.BASE_URL}/uploads/${uniqueName}`,
    })
    .returning()

  return {
    file: {
      ...insertedFile,
    },
  }
}
