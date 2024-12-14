import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authLogin } from '../../services/auth-login'

export const authLoginRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/auth/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async request => {
      const { email, password } = request.body

      const { token, user } = await authLogin({
        email,
        password,
      })

      return { token, user }
    }
  )
}
