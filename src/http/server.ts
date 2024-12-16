import fastify from 'fastify'
import {
  validatorCompiler,
  serializerCompiler,
} from 'fastify-type-provider-zod'
import path from 'node:path'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import { env } from '@/env'
import { authenticate } from '@http/middleware/authenticate'
import { authRoutes } from '@http/modules/auth/routes'
import { fileRoutes } from '@http/modules/files/routes'

const app = fastify().withTypeProvider()

// Plugins
app.register(fastifyMultipart, { limits: { fileSize: 10 * 1024 * 1024 } })
app.register(fastifyStatic, {
  root: path.resolve(__dirname, '..', 'uploads'),
  prefix: '/uploads/',
})
app.register(fastifyCors, { origin: '*' })
app.register(fastifyJwt, { secret: env.JWT_SECRET })
app.decorate('authenticate', authenticate)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(authRoutes, { prefix: '/api/auth' })
app.register(fileRoutes, { prefix: '/api/files' })

app.listen({ port: env.PORT || 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!')
})
