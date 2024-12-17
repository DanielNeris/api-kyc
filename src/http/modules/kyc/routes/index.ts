import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createKycRoute } from './create-kyc.routes'
import { updateKycStatusRoute } from './update-kyc-status.routes'
import { listKycRoute } from './list-kyc.routes'
import { getKycRoute } from './get-kyc.routes'
import { getFilesRoute } from './get-kyc-status-history.routes'
import { shareFileRoute } from './share-file.routes'

export const kycRoutes: FastifyPluginAsyncZod = async app => {
  await app.register(createKycRoute)
  await app.register(updateKycStatusRoute)
  await app.register(listKycRoute)
  await app.register(getKycRoute)
  await app.register(getFilesRoute)
  await app.register(shareFileRoute)
}
