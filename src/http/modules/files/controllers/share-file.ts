import { shareFile } from '@/http/services/files/share-file'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function shareFileController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params

  const result = await shareFile({ id })

  if (!result) {
    return reply.status(404).send({ message: 'File not found' })
  }

  return reply.send(result)
}
