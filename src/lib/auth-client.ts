import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient()

export const { useSession } = authClient // for accessing session client side
