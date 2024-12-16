import { listFiles } from '@/http/services/files/list-files'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listFilesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await listFiles()

  return reply.send(result)
}
