import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { db } from '@db/index'
import { users, type UserRole } from '@db/schema'
import type { MultipartFile } from '@fastify/multipart'

interface AuthRegisterRequest {
  file: MultipartFile
  userId: string
}

export async function createKyc({
  userId
  file,
}: AuthRegisterRequest) {
  const [userExist] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  if (userExist) {
    throw new Error('Email already in use')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    fullName,
    role,
    email,
    passwordHash,
  })

  return true
}
