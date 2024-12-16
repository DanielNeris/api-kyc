import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { fileUploadRoute } from './create-file.routes'
import { listFilesRoute } from './list-files.routes'
import { shareFileRoute } from './share-file.routes'

export const fileRoutes: FastifyPluginAsyncZod = async app => {
  await app.register(fileUploadRoute)
  await app.register(listFilesRoute)
  await app.register(shareFileRoute)
}
