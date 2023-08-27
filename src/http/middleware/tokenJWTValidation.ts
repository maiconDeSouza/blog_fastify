import { FastifyReply, FastifyRequest } from 'fastify'

export async function tokenJWTValidation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const tokenJWT = await request.jwtVerify()

  if (!tokenJWT) {
    reply.status(401).send({
      statusCode: 401,
      message: `Unauthorized access. Please login to continue.`,
    })
  }
}
