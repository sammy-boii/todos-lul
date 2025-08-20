'use client'

import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useTransition } from 'react'

const LoginWithGithub = () => {
  const [isPending, startTransition] = useTransition()

  async function signInWithGithub() {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onError: () => {
            toast.error('Github sign-in failed. Please try again.')
          }
        }
      })
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={signInWithGithub}
      variant='outline'
      className='flex-1'
    >
      <FaGithub className='size-5' />
      <div>Github</div>
    </Button>
  )
}
export default LoginWithGithub
