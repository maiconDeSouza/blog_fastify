import { createPostsDTO, postsPrisma } from '../prisma/postsPrisma'

async function runDB() {
  const db = await postsPrisma()
  return db
}

async function create(data: createPostsDTO) {
  const db = await runDB()

  const newPost = await db.create(data)

  return newPost
}

export async function postsRepositories() {
  return { create }
}
