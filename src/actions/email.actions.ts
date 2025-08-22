'use server'

import EmailTemplate from '@/components/misc/EmailTemplate'
import { resend } from '@/lib/resend'

export async function sendEmailAction(email: string, otp: string) {
  await resend.emails.send({
    from: 'TodoApp <onboarding@resend.dev>',
    to: [email],
    subject: 'Your Verification Code',
    react: EmailTemplate({ otp })
  })
}
