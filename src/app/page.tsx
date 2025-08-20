'use client'

import { useSession } from '@/lib/auth-client'

const Home = () => {
  const { data, isPending } = useSession()

  return <div>{isPending ? 'Loading...' : JSON.stringify(data, null, 2)}</div>
}
export default Home
