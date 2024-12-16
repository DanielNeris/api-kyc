import { getFile } from '@/http/services/files/get-file'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getFileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await getFile({
    userId: (request.user as { id: string }).id,
  })

  return reply.send(result)
}
