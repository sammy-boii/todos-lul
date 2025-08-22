import { betterAuth } from 'better-auth'
import { APIError } from 'better-auth/api'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { createAuthMiddleware, emailOTP } from 'better-auth/plugins'

import prisma from './db'
import { resend } from './resend'
import EmailTemplate from '@/components/misc/EmailTemplate'
import { nextCookies } from 'better-auth/next-js'
import { VALID_DOMAINS } from './constants'
import { normalizeName } from './utils'
import { UserRole } from '@/generated/prisma'
import { sendEmailAction } from '@/actions/email.actions'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    // autoSignIn: false
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30 // 30 days
  },
  user: {
    additionalFields: {
      role: {
        type: [UserRole.USER, UserRole.ADMIN],
        input: false
      }
    }
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/sign-up/email') {
        // path used by better-auth
        const domain = String(ctx.body.email).split('@')[1]
        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError('BAD_REQUEST', {
            message: 'Invalid email. Please use a supported domain.'
          })
        }

        const name = normalizeName(ctx.body.name)

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name
            }
          }
        }
      }
    })
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(';')
          if (ADMIN_EMAILS.includes(user.email)) {
            return {
              data: { ...user, role: UserRole.ADMIN }
            }
          }
        }
      }
    }
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'sign-in') {
          await sendEmailAction(email, otp)
        } else if (type === 'email-verification') {
        } else {
        }
      }
    }),
    nextCookies()
  ]
})

// nextCookies() need to be the last plugin in the array
