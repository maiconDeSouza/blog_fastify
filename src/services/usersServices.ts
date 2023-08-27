import { AppError } from '../Error/AppError'
import { usersRepositories } from '../models/repositories/usersRepositories'
import { utils } from '../utils/utils'

async function runRepositories() {
  const repositories = await usersRepositories()
  return repositories
}

async function create(
  name: string,
  email: string,
  passwordOne: string,
  passwordTwo: string,
) {
  const repositories = await runRepositories()
  const u = await utils()

  if (passwordOne !== passwordTwo) {
    throw new AppError(
      'The passwords entered do not match. Please make sure you enter the same password in both fields.',
      400,
    )
  }

  const password = await u.generateHashPassword(passwordOne)

  const data = { name, email, password }

  const newUser = await repositories.create(data)

  if (!newUser.id) {
    throw new AppError()
  }

  return newUser
}

async function login(email: string, passwordLogin: string) {
  const repositories = await runRepositories()
  const u = await utils()
  const password = true
  const post = false

  const user = await repositories.showEmail(email, password, post)

  if (!user?.email) {
    throw new AppError('Invalid email or password.', 401)
  }

  const hashPassword = await u.generateHashPassword(passwordLogin)

  if (hashPassword !== user.password) {
    throw new AppError('Invalid email or password.', 401)
  }

  const userLogin = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  return userLogin
}

async function showUser(userId: string, sub: string) {
  const repositories = await runRepositories()
  const password = false
  const post = false

  if (userId !== sub) {
    throw new AppError('Unauthorized access.', 401)
  }

  const user = await repositories.show(userId, password, post)

  if (!user?.id) {
    throw new AppError('User not found.', 404)
  }

  return user
}

async function showPosts(userId: string) {
  const repositories = await runRepositories()
  const password = false
  const post = true

  const user = await repositories.show(userId, password, post)

  if (!user?.id) {
    throw new AppError('User not found.', 404)
  }

  return user
}

async function showUserUpdate(
  userId: string,
  sub: string,
  name: string,
  email: string,
  passwordRight: string,
  passwordOne: string,
  passwordTwo: string,
) {
  const repositories = await runRepositories()
  const u = await utils()
  const password = true
  const post = false
  const changePassword =
    passwordRight.length >= 5 &&
    passwordOne.length >= 5 &&
    passwordTwo.length >= 5

  if (userId !== sub) {
    throw new AppError('Unauthorized access.', 401)
  }

  const user = await repositories.show(userId, password, post)

  if (!user?.id) {
    throw new AppError('User not found.', 404)
  }

  if (!changePassword) {
    if (
      passwordRight.length > 0 ||
      passwordOne.length > 0 ||
      passwordTwo.length > 0
    ) {
      throw new AppError(
        'Unable to update your password, as either your password matches or you entered different passwords in the two fields.',
        400,
      )
    }
  }

  if (changePassword) {
    const hashPasswordRight = await u.generateHashPassword(passwordRight)
    if (hashPasswordRight !== user.password) {
      throw new AppError(
        'Unable to update your password, as either your password matches or you entered different passwords in the two fields.',
        400,
      )
    }
    if (passwordOne !== passwordTwo) {
      throw new AppError(
        'Unable to update your password, as either your password matches or you entered different passwords in the two fields.',
        400,
      )
    }

    const newPassword = await u.generateHashPassword(passwordOne)

    const data = {
      name: name || user.name,
      email: email || user.email,
      password: newPassword,
    }

    const userUp = await repositories.update(userId, data)

    return userUp
  }

  const data = {
    name: name || user.name,
    email: email || user.email,
    password: user.password,
  }

  const userUp = await repositories.update(userId, data)

  return userUp
}

export async function usersServices() {
  return { create, login, showUser, showPosts, showUserUpdate }
}
