import { listFiles } from '@/http/services/files/list-files'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getFileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await listFiles({
    userId: (request.user as { id: string }).id,
  })

  return reply.send(result)
}
