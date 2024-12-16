import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getFileController } from '../controllers/get-file'

export const getFilesRoute: FastifyPluginAsyncZod = async app => {
  app.get('/:userId', { preHandler: [app.authenticate] }, getFileController)
}
