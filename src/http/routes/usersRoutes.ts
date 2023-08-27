import { FastifyInstance } from 'fastify'
import { usersControllers } from '../controllers/usersControllers'
import { tokenJWTValidation } from '../middleware/tokenJWTValidation'

export async function usersRoutes(app: FastifyInstance) {
  const controllers = await usersControllers()

  app.post('/users', controllers.create)

  app.post('/users/login', controllers.login)

  app.get(
    '/users/:userId',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.getUser,
  )

  app.put(
    '/users/:userId',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.update,
  )
}
