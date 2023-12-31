import { FastifyInstance } from 'fastify'
import { tokenJWTValidation } from '../middleware/tokenJWTValidation'
import { postsControllers } from '../controllers/postsControllers'

export async function postRoutes(app: FastifyInstance) {
  const controllers = await postsControllers()
  app.post(
    '/posts/:userId',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.create,
  )

  app.get(
    '/posts/all/:userId',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.index,
  )

  app.put(
    '/posts/published/:userId/:postId',
    {
      preHandler: tokenJWTValidation,
    },
    controllers.published,
  )
}
