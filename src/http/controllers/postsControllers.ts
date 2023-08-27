import { FastifyReply, FastifyRequest } from 'fastify'
import { postsServices } from '../../services/postsServices'
import { z } from 'zod'
import { handleCatchError } from '../../Error/handleCatchError'

async function runServices() {
  const services = await postsServices()
  return services
}

const createPostBodySchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10),
})

const userIDParamsSchema = z.object({
  userId: z.string().uuid(),
})

const postIDParamsSchema = z.object({
  postId: z.string().uuid(),
})

const subUserSchema = z.object({
  sub: z.string().uuid(),
})

async function create(request: FastifyRequest, reply: FastifyReply) {
  const services = await runServices()
  const { userId } = userIDParamsSchema.parse(request.params)
  const { sub } = subUserSchema.parse(request.user)
  const { title, content } = createPostBodySchema.parse(request.body)

  try {
    const newPost = await services.create(userId, sub, title, content)
    reply.status(201).send({
      code: 201,
      message: `post created successfully.`,
      newPost,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

async function published(request: FastifyRequest, reply: FastifyReply) {
  const services = await runServices()
  const { userId } = userIDParamsSchema.parse(request.params)
  const { postId } = postIDParamsSchema.parse(request.params)
  const { sub } = subUserSchema.parse(request.user)

  try {
    const updatePostPublished = await services.published(userId, postId, sub)
    reply.status(200).send({
      code: 200,
      message: `update published`,
      updatePostPublished,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

export async function postsControllers() {
  return { create, published }
}
