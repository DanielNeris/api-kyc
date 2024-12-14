import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { db } from '../db'
import { users } from '../db/schema'
import { env } from '../env'

interface AuthLoginRequest {
  email: string
  password: string
}

export async function authLogin({ email, password }: AuthLoginRequest) {
  const [user] = await db.select().from(users).where(eq(users.email, email))

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: '1h',
  })

  return { token, user: { id: user.id, email: user.email } }
}
