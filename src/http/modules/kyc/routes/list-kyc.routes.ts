import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { listKycController } from '../controllers/list-kyc'
import { checkAdminRole } from '../../../middleware/check-admin-role'

export const listKycRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/',
    { preHandler: [app.authenticate, checkAdminRole] },
    listKycController
  )
}
