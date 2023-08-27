import { createUsersDTO, usersPrisma } from '../prisma/usersPrisma'

async function runDB() {
  const db = await usersPrisma()
  return db
}

async function create(data: createUsersDTO) {
  const db = await runDB()

  const newUser = await db.create(data)

  return newUser
}

async function show(userId: string, password: boolean, post: boolean) {
  const db = await runDB()

  const user = await db.show(userId, password, post)

  return user
}

async function showEmail(email: string, password: boolean, post: boolean) {
  const db = await runDB()

  const user = await db.showEmail(email, password, post)

  return user
}

async function update(userId: string, data: createUsersDTO) {
  const db = await runDB()

  const userUp = await db.update(userId, data)

  return userUp
}

async function destroy(userId: string) {
  const db = await runDB()

  const userDel = await db.destroy(userId)

  return userDel
}

export async function usersRepositories() {
  return { create, show, showEmail, update, destroy }
}
