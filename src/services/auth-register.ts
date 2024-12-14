import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { db } from '../db'
import { users } from '../db/schema'

interface AuthRegisterRequest {
  email: string
  password: string
}

export async function authRegister({ email, password }: AuthRegisterRequest) {
  const [userExist] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  if (userExist) {
    throw new Error('Email already in use')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    email,
    passwordHash,
  })

  return true
}
