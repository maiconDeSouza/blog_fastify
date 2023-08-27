import { Prisma } from '@prisma/client'
import { prismaClient } from '../../config/prismaClient'

export interface createPostsDTO {
  title: string
  content: string
  author_id: string
}

async function create(data: createPostsDTO) {
  const newPost = await prismaClient.post.create({ data })
  return newPost
}

async function index(userId: string) {
  const posts = await prismaClient.post.findMany({
    where: {
      author_id: userId,
    },
  })
  return posts
}

async function show(userId: string, postId: string) {
  const post = await prismaClient.post.findUnique({
    where: { author_id: userId, id: postId },
  })

  return post
}

async function update(
  userId: string,
  postId: string,
  data: Prisma.PostUpdateInput,
) {
  const upPost = await prismaClient.post.update({
    where: {
      author_id: userId,
      id: postId,
    },
    data,
  })

  return upPost
}

async function destroy(userId: string, postId: string) {
  const post = await prismaClient.post.delete({
    where: {
      author_id: userId,
      id: postId,
    },
    select: {
      id: true,
    },
  })

  return post
}

export async function postsPrisma() {
  return { create, index, show, update, destroy }
}
