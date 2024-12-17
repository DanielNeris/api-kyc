import type { FastifyRequest, FastifyReply } from 'fastify'
import { createKyc } from '@/http/services/kyc/create-kyc'

export async function createKycController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const file = await request.file()

  if (!file) {
    return reply.status(400).send({ message: 'File is required' })
  }

  const result = await createKyc({
    file,
    userId: (request.user as { id: string }).id,
  })

  return reply.send(result)
}
