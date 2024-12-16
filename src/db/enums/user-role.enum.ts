import { pgEnum } from 'drizzle-orm/pg-core'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const userRoleEnum = pgEnum('role', [UserRole.ADMIN, UserRole.USER])
