'use client'

import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useTransition } from 'react'

interface OAuthLoginButtonProps {
  provider: 'google' | 'github'
}

const OAuthLoginButton = ({ provider }: OAuthLoginButtonProps) => {
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

  async function signInWithGoogle() {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: '/',
        fetchOptions: {
          onError: () => {
            toast.error(`${provider} sign-in failed. Please try again.`)
          }
        }
      })
    })
  }

  const signInMethods = {
    google: signInWithGoogle,
    github: signInWithGithub
  }
  return (
    <Button
      disabled={isPending}
      onClick={signInMethods[provider]}
      variant='outline'
      className='flex-1'
    >
      {provider === 'google' && <FaGoogle className='size-5' />}
      {provider === 'github' && <FaGithub className='size-5' />}
      <div>{provider.slice(0, 1).toUpperCase() + provider.slice(1)}</div>
    </Button>
  )
}
export default OAuthLoginButton
