import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { updateKycStatusController } from '../controllers/update-kyc-status'
import { checkAdminRole } from '../../../middleware/check-admin-role'
import type { KycStatus } from '../../../../db/enums'

export const updateKycStatusRoute: FastifyPluginAsyncZod = async app => {
  app.patch<{
    Body: {
      kycId: string
      status: KycStatus.APPROVED | KycStatus.REJECTED
      remarks?: string
    }
  }>(
    '/update-status',
    { preHandler: [app.authenticate, checkAdminRole] },
    updateKycStatusController
  )
}
