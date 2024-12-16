import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { shareFileController } from '../controllers/share-file'

export const shareFileRoute: FastifyPluginAsyncZod = async app => {
  app.get('/public/files/:id', shareFileController)
}
