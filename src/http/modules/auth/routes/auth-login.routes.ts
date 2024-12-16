import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { loginController } from '../controllers/auth-login'

export const loginRoute: FastifyPluginAsyncZod = async app => {
  app.post('/login', loginController)
}
