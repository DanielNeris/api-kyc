import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getKycKpisRoute } from './get-kyc-kpis.routes'

export const dashboardRoutes: FastifyPluginAsyncZod = async app => {
  await app.register(getKycKpisRoute)
}
