import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getKycController } from '../controllers/get-kyc'

export const getKycRoute: FastifyPluginAsyncZod = async app => {
  app.get<{ Params: { userId: string } }>(
    '/:userId',
    { preHandler: [app.authenticate] },
    getKycController
  )
}
