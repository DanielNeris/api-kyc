import { z } from 'zod'
import { createFile } from '@/http/services/files/create-file'
import type { FastifyRequest, FastifyReply } from 'fastify'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function createKycController(
  request: FastifyRequest<{ Body: z.infer<typeof schema> }>,
  reply: FastifyReply
) {
  const file = await request.file()

  if (!file) {
    return reply.status(400).send({ message: 'File is required' })
  }

  const result = await createFile({
    file,
    userId: (request.user as { id: string }).id,
  })

  return reply.send(result)
}
