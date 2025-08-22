'use client'

import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace('/login')
          toast.success('Successfully logged out.')
        },
        onError: () => {
          toast.error('Something went wrong. Please try again.')
        }
      }
    })
  }

  return <Button onClick={signOut}>Logout</Button>
}
export default Logout
