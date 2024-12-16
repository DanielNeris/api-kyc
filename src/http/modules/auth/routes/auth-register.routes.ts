import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerController } from '../controllers/auth-register'

export const registerRoute: FastifyPluginAsyncZod = async app => {
  app.post('/register', registerController)
}
