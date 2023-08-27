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

async function published(userId: string, postId: string, sub: string) {
  const repositories = await runRepositories()
  if (userId !== sub) {
    throw new AppError('Unauthorized access.', 401)
  }

  const post = await repositories.show(userId, postId)

  if (!post?.id) {
    throw new AppError('User or post not found.', 404)
  }

  const published = !post.published

  const updatePostPublished = await repositories.updatePublished(
    userId,
    postId,
    published,
  )

  return updatePostPublished
}

async function index(userId: string, sub: string) {
  const repositories = await runRepositories()
  if (userId !== sub) {
    throw new AppError('Unauthorized access.', 401)
  }

  const allPosts = await repositories.index(userId)

  return allPosts
}

export async function postsServices() {
  return { create, published, index }
}
