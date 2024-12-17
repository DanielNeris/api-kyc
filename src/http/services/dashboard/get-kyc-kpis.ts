import { KycStatus, UserRole } from '@/db/enums'
import { db } from '@db/index'
import { kyc, users } from '@db/schema'
import { count, eq } from 'drizzle-orm'

export async function getKycKpis() {
  const [{ totalUsers }] = await db
    .select({ totalUsers: count() })
    .from(users)
    .where(eq(users.role, UserRole.USER))

  const [pending, approved, rejected] = await Promise.all([
    db
      .select({ pending: count() })
      .from(kyc)
      .where(eq(kyc.status, KycStatus.PENDING)),

    db
      .select({ approved: count() })
      .from(kyc)
      .where(eq(kyc.status, KycStatus.APPROVED)),

    db
      .select({ rejected: count() })
      .from(kyc)
      .where(eq(kyc.status, KycStatus.REJECTED)),
  ])

  return {
    totalUsers,
    approved: approved[0].approved,
    rejected: rejected[0].rejected,
    pending: pending[0].pending,
  }
}
