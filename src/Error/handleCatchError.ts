import { FastifyReply } from 'fastify'
import { AppError } from './AppError'

export function handleCatchError(error: unknown, reply: FastifyReply) {
  if (error instanceof Error) {
    return reply.status(500).send({
      code: 500,
      message: error.message,
    })
  }
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      code: error.statusCode,
      message: error.message,
    })
  }

  reply.status(500).send({
    code: 500,
    message:
      'An unexpected error occurred on the server. Please try again or attempt later.',
  })
}
