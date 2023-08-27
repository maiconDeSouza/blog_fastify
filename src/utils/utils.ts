import { createHmac } from 'node:crypto'
import { env } from '../config/env'

async function generateHashPassword(passwordOne: string) {
  const hash = createHmac('sha256', passwordOne)
    .update(env.HASH_PASSWORD)
    .digest('hex')

  return hash
}

export async function utils() {
  return { generateHashPassword }
}
