import { Prisma } from '@prisma/client'
import { prismaClient } from '../../config/prismaClient'

export type createUsersDTO = Prisma.UserCreateInput

async function create(data: createUsersDTO) {
  const newUser = await prismaClient.user.create({
    data,
    select: { id: true, name: true },
  })
  return newUser
}

async function show(id: string, password: boolean, post: boolean) {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password,
      Post: post,
    },
  })

  return user
}

async function showEmail(email: string, password: boolean, post: boolean) {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password,
      Post: post,
    },
  })

  return user
}

async function update(id: string, data: Prisma.PostUpdateInput) {
  const upUser = await prismaClient.user.update({
    where: {
      id,
    },
    data,
    select: {
      name: true,
      email: true,
    },
  })

  return upUser
}

async function destroy(id: string) {
  const user = await prismaClient.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
    },
  })
  return user
}

export async function usersPrisma() {
  return { create, show, showEmail, update, destroy }
}
