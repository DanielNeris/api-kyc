import { getKycStatusHistory } from '@/http/services/kyc-status-history/get-kyc-status-history'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const schema = z.object({
  kycId: z.string().min(1, 'KYC ID is required.'),
})

export async function getKycStatusHistoryController(
  request: FastifyRequest<{ Params: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const { kycId } = schema.parse(request.params)

  const result = await getKycStatusHistory({
    kycId,
  })

  return reply.send(result)
}
