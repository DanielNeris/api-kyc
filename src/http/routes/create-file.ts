import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createFile } from '../../services/create-file'

export const fileUploadRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/files/upload',
    { preHandler: [app.authenticate] },
    async request => {
      const file = await request.file()

      if (!file) return

      const result = await createFile({
        file,
        userId: (request.user as { id: string }).id,
      })

      return result
    }
  )
}
