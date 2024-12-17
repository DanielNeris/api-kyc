import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { authRegister } from '@/http/services/auth/auth-register'
import type { UserRole } from '@/db/enums'

const schema = z
  .object({
    fullName: z.string().min(1, 'fullName is required'),
    role: z.enum(['admin', 'user']),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password confirmation must be at least 6 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export async function registerController(
  request: FastifyRequest<{ Body: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const { fullName, role, email, password } = schema.parse(request.body)

  const userRole = role as UserRole

  const { user } = await authRegister({
    fullName,
    role: userRole,
    email,
    password,
  })

  return reply.status(201).send({ user })
}
