import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { fileUploadController } from '../controllers/create-file'

export const fileUploadRoute: FastifyPluginAsyncZod = async app => {
  app.post('/upload', { preHandler: [app.authenticate] }, fileUploadController)
}
