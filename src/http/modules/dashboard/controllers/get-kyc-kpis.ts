import { getKycKpis } from '../../../services/dashboard/get-kyc-kpis'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function getKycKpisController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await getKycKpis()

  return reply.send(result)
}
