import { FastifyReply, FastifyRequest } from 'fastify'
import { usersServices } from '../../services/usersServices'
import { z } from 'zod'
import { handleCatchError } from '../../Error/handleCatchError'

async function runServices() {
  const services = await usersServices()
  return services
}

const createUsersBodySchema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email(),
  passwordOne: z.string().min(3).max(24),
  passwordTwo: z.string().min(3).max(24),
})

const loginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(24),
})

const updateBodySchema = z.object({
  name: z.union([z.string().min(5).max(50), z.string().default('')]),
  email: z.union([z.string().email(), z.string().default('')]),
  password: z.union([z.string().min(3).max(24), z.string().default('')]),
  passwordOne: z.union([z.string().min(3).max(24), z.string().default('')]),
  passwordTwo: z.union([z.string().min(3).max(24), z.string().default('')]),
})

const destroyBodySchema = z.object({
  password: z.string().min(6).max(24),
})

const userIDParamsSchema = z.object({
  userId: z.string().uuid(),
})

const subUserSchema = z.object({
  sub: z.string().uuid(),
})
//

async function create(request: FastifyRequest, reply: FastifyReply) {
  const services = await runServices()

  const { name, email, passwordOne, passwordTwo } = createUsersBodySchema.parse(
    request.body,
  )

  try {
    const newUser = await services.create(name, email, passwordOne, passwordTwo)
    reply.status(201).send({
      code: 201,
      message: `user created successfully.`,
      newUser,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

async function login(request: FastifyRequest, reply: FastifyReply) {
  const services = await runServices()

  const { email, password } = loginUserBodySchema.parse(request.body)

  try {
    const userLogin = await services.login(email, password)
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: userLogin.id,
        },
      },
    )
    reply.status(200).send({
      code: 200,
      message: `ok`,
      user: userLogin,
      token,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const services = await runServices()
  const { userId } = userIDParamsSchema.parse(request.params)
  const { sub } = subUserSchema.parse(request.user)

  try {
    const user = await services.showUser(userId, sub)
    reply.status(200).send({
      code: 200,
      message: `ok`,
      user,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

async function update(request: FastifyRequest, reply: FastifyReply) {
  const services = await runServices()
  const { userId } = userIDParamsSchema.parse(request.params)
  const { sub } = subUserSchema.parse(request.user)
  const { name, email, password, passwordOne, passwordTwo } =
    updateBodySchema.parse(request.body)

  try {
    const userUp = await services.showUserUpdate(
      userId,
      sub,
      name,
      email,
      password,
      passwordOne,
      passwordTwo,
    )
    reply.status(200).send({
      code: 200,
      message: `ok`,
      userUp,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const services = await runServices()
  const { userId } = userIDParamsSchema.parse(request.params)
  const { sub } = subUserSchema.parse(request.user)
  const { password } = destroyBodySchema.parse(request.body)

  try {
    const userDel = await services.destroy(userId, sub, password)
    reply.status(200).send({
      code: 200,
      message: `User deleted successfully.`,
      userDel,
    })
  } catch (error) {
    handleCatchError(error, reply)
  }
}

export async function usersControllers() {
  return { create, getUser, login, update, destroy }
}
