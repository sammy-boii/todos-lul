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
          toast.success('Successfully logged out.')
          router.replace('/login')
        }
      }
    })
  }

  return <Button onClick={signOut}>Logout</Button>
}
export default Logout
