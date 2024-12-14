import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import path from 'node:path'

import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import { env } from '../env'

import { authLoginRoute } from './routes/auth-login'
import { authRegisterRoute } from './routes/auth-register'
import { fileUploadRoute } from './routes/create-file'
import { listFilesRoute } from './routes/list-files'
import { shareFileRoute } from './routes/share-file'

const app = fastify({}).withTypeProvider<ZodTypeProvider>()

app.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  attachFieldsToBody: false,
})

app.register(fastifyStatic, {
  root: path.resolve(__dirname, '..', '..', 'uploads'),
  prefix: '/uploads/',
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' })
  }
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(
  async apiRoutes => {
    apiRoutes.register(authLoginRoute)
    apiRoutes.register(authRegisterRoute)
    apiRoutes.register(fileUploadRoute)
    apiRoutes.register(listFilesRoute)
    apiRoutes.register(shareFileRoute)
  },
  { prefix: '/api' }
)

app
  .listen({
    port: env.PORT || 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP Server running!')
  })
