import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createKycRoute } from './create-kyc.routes'
import { listFilesRoute } from './list-files.routes'
import { shareFileRoute } from './share-file.routes'

export const kycRoutes: FastifyPluginAsyncZod = async app => {
  await app.register(createKycRoute)
  await app.register(listFilesRoute)
  await app.register(shareFileRoute)
}
