import { createFile } from '@/http/services/files/create-file'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function fileUploadController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const file = await request.file()

  if (!file) {
    return reply.status(400).send({ message: 'File is required' })
  }

  const result = await createFile({
    file,
    userId: (request.user as { id: string }).id,
  })

  return reply.send(result)
}
