import { listKyc } from '../../../services/kyc/list-kyc'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listKycController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await listKyc()

  return reply.send(result)
}
