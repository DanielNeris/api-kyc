import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getKycKpisController } from '../controllers/get-kyc-kpis'
import { checkAdminRole } from '@/http/middleware/check-admin-role'

export const getKycKpisRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/kpis',
    { preHandler: [app.authenticate, checkAdminRole] },
    getKycKpisController
  )
}
