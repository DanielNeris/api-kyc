import { z } from 'zod'
import { authLogin } from '../../../services/auth/auth-login'
import type { FastifyRequest, FastifyReply } from 'fastify'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function loginController(
  request: FastifyRequest<{ Body: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const { email, password } = schema.parse(request.body)

  const { token } = await authLogin({ email, password })

  return reply.send({ token })
}
