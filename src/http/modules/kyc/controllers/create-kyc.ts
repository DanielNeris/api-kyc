import type { FastifyRequest, FastifyReply } from 'fastify'
import { createKyc } from '@/http/services/kyc/create-kyc'
import { z } from 'zod'

const schema = z.object({
  userId: z.string().min(1, 'USER ID is required.'),
})

export async function createKycController(
  request: FastifyRequest<{ Params: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const file = await request.file()

  if (!file) {
    return reply.status(400).send({ message: 'File is required' })
  }

  const result = await createKyc({
    file,
    userId: request.params.userId,
  })

  return reply.send(result)
}
