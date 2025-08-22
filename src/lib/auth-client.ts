import {
  emailOTPClient,
  inferAdditionalFields
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { type auth } from './auth'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [emailOTPClient(), inferAdditionalFields<typeof auth>()]
})

export const { useSession } = authClient // for accessing session client side
