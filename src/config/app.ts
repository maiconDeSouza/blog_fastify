import fastify from 'fastify'
import { usersRoutes } from '../http/routes/usersRoutes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { postRoutes } from '../http/routes/postsRoutes'

const app = fastify()

const prefix = env.URL_API
const secret = env.SECRET_JWT

app.register(fastifyJwt, {
  secret,
})

app.register(usersRoutes, {
  prefix,
})

app.register(postRoutes, {
  prefix,
})

export { app }
