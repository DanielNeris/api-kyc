import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { listFiles } from '../../services/list-files'

export const listFilesRoute: FastifyPluginAsyncZod = async app => {
  app.get('/files', { preHandler: [app.authenticate] }, async request => {
    const result = await listFiles({
      userId: (request.user as { id: string }).id,
    })

    return result
  })
}
