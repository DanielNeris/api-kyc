import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { loginRoute } from './auth-login.routes'
import { registerRoute } from './auth-register.routes'

export const authRoutes: FastifyPluginAsyncZod = async app => {
  await app.register(loginRoute)
  await app.register(registerRoute)
}
