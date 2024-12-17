import { getKycStatusHistory } from '@/http/services/kyc-status-history/get-kyc-status-history'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getKycStatusHistoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await getKycStatusHistory({
    kycId: request.params.kycId,
  })

  return reply.send(result)
}
