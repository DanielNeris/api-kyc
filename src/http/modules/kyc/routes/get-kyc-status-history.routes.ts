import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getKycStatusHistoryController } from '../controllers/get-kyc-status-history'

export const getKycHistoryRoute: FastifyPluginAsyncZod = async app => {
  app.get<{ Params: { kycId: string } }>(
    '/:kycId/history',
    { preHandler: [app.authenticate] },
    getKycStatusHistoryController
  )
}
