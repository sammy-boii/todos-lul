import 'server-only'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { TUserRole } from '@/types/user.types'

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    throw new Error('No user session found')
  }

  return session.user
}

export async function isAuthorized(roles: TUserRole[] | TUserRole) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  roles = Array.isArray(roles) ? roles : [roles]

  if (session?.user.role) {
    return roles.includes(session.user.role)
  }
}
