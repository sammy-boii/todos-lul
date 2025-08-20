'use client'

import { FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'

const LoginWithGoogle = () => {
  const [isPending, startTransition] = useTransition()

  async function signInWithGoogle() {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
        fetchOptions: {
          onError: () => {
            toast.error('Google sign-in failed. Please try again.')
          }
        }
      })
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={signInWithGoogle}
      variant='outline'
      className='flex-1'
    >
      <FaGoogle className='size-5' />
      <div>Google</div>
    </Button>
  )
}
export default LoginWithGoogle
