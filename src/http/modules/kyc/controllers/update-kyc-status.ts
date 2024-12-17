import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { updateKycStatus } from '../../../services/kyc/update-kyc-status'
import { KycStatus } from '../../../../db/enums'

const schema = z.object({
  kycId: z.string().min(1, 'KYC ID is required.'),
  status: z.enum([KycStatus.APPROVED, KycStatus.REJECTED], {
    errorMap: () => ({
      message: 'Status must be either APPROVED or REJECTED.',
    }),
  }),
  remarks: z.string().optional(),
})

export async function updateKycStatusController(
  request: FastifyRequest<{ Body: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const { status, remarks, kycId } = schema.parse(request.body)

  const result = await updateKycStatus({
    kycId,
    userId: (request.user as { id: string }).id,
    status,
    remarks,
  })

  return reply.send(result)
}
