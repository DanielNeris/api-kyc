import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { shareFile } from '@/http/services/files/share-file'

export const shareFileRoute: FastifyPluginAsyncZod = async app => {
  app.get('/public/files/:id', async request => {
    const { id } = request.params as { id: string }
    const result = await shareFile({ id })

    return result
  })
}
