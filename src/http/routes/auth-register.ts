import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authRegister } from '../../services/auth-register'

export const authRegisterRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/auth/register',
    {
      schema: {
        body: z
          .object({
            email: z.string().email(),
            password: z
              .string()
              .min(6, 'Password must be at least 6 characters'),
            confirmPassword: z
              .string()
              .min(6, 'Password confirmation must be at least 6 characters'),
          })
          .refine(data => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
          }),
      },
    },
    async request => {
      const { email, password } = request.body

      await authRegister({
        email,
        password,
      })
    }
  )
}
