import { getKyc } from '@/http/services/kyc/get-kyc'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const schema = z.object({
  userId: z.string().min(1, 'USER ID is required.'),
})

export async function getKycController(
  request: FastifyRequest<{ Params: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const { userId } = schema.parse(request.params)

  const result = await getKyc({
    userId,
  })

  return reply.send(result)
}
