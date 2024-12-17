import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getKycStatusHistoryController } from '../controllers/get-kyc-status-history'

export const getFilesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/:kycId/history',
    { preHandler: [app.authenticate] },
    getKycStatusHistoryController
  )
}
