import type { FastifyRequest, FastifyReply } from 'fastify'

export async function checkAdminRole(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user as { role: string }

  if (!user || user.role !== 'admin') {
    return reply
      .status(403)
      .send({ message: 'Access denied: Admin role required' })
  }
}
