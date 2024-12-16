import { listFiles } from '@/http/services/files/list-files'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function listFilesController(reply: FastifyReply) {
  const result = await listFiles()

  return reply.send(result)
}
