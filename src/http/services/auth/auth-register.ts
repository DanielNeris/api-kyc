import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { db } from '../../../db'
import { users } from '../../../db/schema../../../db/schema'
import type { UserRole } from '../../../db/enums'

interface AuthRegisterRequest {
  email: string
  password: string
  fullName: string
  role: UserRole
}

export async function authRegister({
  email,
  password,
  role,
  fullName,
}: AuthRegisterRequest) {
  const [userExist] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  if (userExist) {
    throw new Error('Email already in use')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const [user] = await db
    .insert(users)
    .values({
      fullName,
      role,
      email,
      passwordHash,
    })
    .returning()

  return { user: { id: user.id } }
}
