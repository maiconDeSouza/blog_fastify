import { AppError } from '../Error/AppError'
import { postsRepositories } from '../models/repositories/postsRepositories'

async function runRepositories() {
  const repositories = await postsRepositories()
  return repositories
}

async function create(
  userId: string,
  sub: string,
  title: string,
  content: string,
) {
  const repositories = await runRepositories()
  if (userId !== sub) {
    throw new AppError('Unauthorized access.', 401)
  }

  const data = { title, content, author_id: userId }

  const newPost = await repositories.create(data)

  return newPost
}

export async function postsServices() {
  return { create }
}
