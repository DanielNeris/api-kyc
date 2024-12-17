import { getFile } from '@/http/services/files/get-file'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getKycController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await getFile({
    userId: (request.user as { id: string }).id,
  })

  return reply.send(result)
}
