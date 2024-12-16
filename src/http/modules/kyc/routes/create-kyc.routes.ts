import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createKycController } from '../controllers/create-kyc'

export const createKycRoute: FastifyPluginAsyncZod = async app => {
  app.post('/upload', { preHandler: [app.authenticate] }, createKycController)
}
