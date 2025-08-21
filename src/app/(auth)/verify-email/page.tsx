'use client'

import { useState, useTransition } from 'react'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState('')
  const [pending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const router = useRouter()

  const handleSubmit = () => {
    if (!email) {
      return toast.error('Please provide an email address.')
    }
    startTransition(async () => {
      await authClient.emailOtp.checkVerificationOtp({
        email,
        otp,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email verified successfully!')
            router.push('/')
          },
          onError: (error) => {
            toast.error('Error verifying email. Please try again.')
            console.log(error)
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
      <CardContent>
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
