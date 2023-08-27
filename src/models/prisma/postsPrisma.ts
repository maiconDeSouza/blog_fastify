import { Prisma } from '@prisma/client'
import { prismaClient } from '../../config/prismaClient'

async function create(data: Prisma.PostCreateInput) {
  const newPost = await prismaClient.post.create({ data })
  return newPost
}

async function index(userId: string) {
  const posts = await prismaClient.post.findMany({
    where: {
      userId,
    },
  })
  return posts
}

async function show(userId: string, postId: string) {
  const post = await prismaClient.post.findUnique({
    where: { userId, id: postId },
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
      userId,
      id: postId,
    },
    data,
  })

  return upPost
}

async function destroy(userId: string, postId: string) {
  const post = await prismaClient.post.delete({
    where: {
      userId,
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
