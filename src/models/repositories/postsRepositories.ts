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

async function show(userId: string, postId: string) {
  const db = await runDB()

  const post = await db.show(userId, postId)

  return post
}

async function updatePublished(
  userId: string,
  postId: string,
  published: boolean,
) {
  const db = await runDB()

  const data = {
    published,
  }

  const updatePostPublished = await db.update(userId, postId, data)

  return updatePostPublished
}

async function index(userId: string) {
  const db = await runDB()

  const allPosts = await db.index(userId)

  return allPosts
}

export async function postsRepositories() {
  return { create, show, updatePublished, index }
}
