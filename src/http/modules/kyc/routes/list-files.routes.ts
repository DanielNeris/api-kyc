import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { listFilesController } from '../controllers/list-files'
import { checkAdminRole } from '@/http/middleware/check-admin-role'

export const listFilesRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/',
    { preHandler: [app.authenticate, checkAdminRole] },
    listFilesController
  )
}
