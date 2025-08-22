'use client'

import { Suspense, useState, useTransition } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader, Loader2 } from 'lucide-react'
import React from 'react'

const VerifyEmailPage = ({
  searchParams
}: {
  searchParams: Promise<{ email?: string }>
}) => {
  const [otp, setOtp] = useState('')
  const [pending, startTransition] = useTransition()
  const [resendPending, startResendTransition] = useTransition()
  const router = useRouter()

  const { email = '' } = React.use(searchParams)

  const handleSubmit = async () => {
    if (!email) {
      return toast.error('Please provide an email address.')
    }
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email verified successfully!')
            router.push('/')
          },
          onError: () => {
            toast.error('Error verifying email. Please try again.')
          }
        }
      })
    })
  }

  const handleResend = async () => {
    if (!email) {
      return toast.error('Please provide an email address.')
    }
    startResendTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success('OTP resent successfully!')
          },
          onError: () => {
            toast.error('Error resending OTP. Please try again.')
          }
        }
      })
    })
  }

  return (
    <Card className='max-w-sm mx-auto mt-24'>
      <CardHeader>
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription className='mt-2'>
          Enter the 6-digit code sent to your email address.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 items-center'>
        <InputOTP
          maxLength={6}
          className=''
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup className='flex gap-2'>
            <InputOTPSlot className='h-12 w-12 text-md' index={0} />
            <InputOTPSlot className='h-12 w-12 text-md' index={1} />
            <InputOTPSlot className='h-12 w-12 text-md' index={2} />
            <InputOTPSlot className='h-12 w-12 text-md' index={3} />
            <InputOTPSlot className='h-12 w-12 text-md' index={4} />
            <InputOTPSlot className='h-12 w-12 text-md' index={5} />
          </InputOTPGroup>
        </InputOTP>
        <button
          disabled={resendPending}
          onClick={handleResend}
          className='cursor-pointer flex items-center gap-1 text-xs text-muted-foreground pr-1 underline ml-auto'
        >
          {resendPending && <Loader className='animate-spin' size={'10px'} />}{' '}
          Resend
        </button>
      </CardContent>
      <CardFooter>
        <Button
          removeLoader
          disabled={otp.length < 6 || pending}
          onClick={handleSubmit}
          className='w-full flex disabled:cursor-not-allowed items-center justify-center gap-2'
        >
          {pending && <Loader2 className='animate-spin' />}
          <span>Verify</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default VerifyEmailPage
