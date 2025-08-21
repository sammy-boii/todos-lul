'use client'

import { useSession } from '@/lib/auth-client'
import Logout from '../auth/Logout'
import { ThemeToggle } from '../ThemeToggle'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

const Navbar = () => {
  const { data } = useSession()

  return (
    <nav className='max-w-screen flex justify-between items-center p-4 text-white'>
      <ThemeToggle />
      {data?.user ? (
        <Logout />
      ) : (
        <Link className={buttonVariants()} href='/login'>
          Login
        </Link>
      )}
    </nav>
  )
}
export default Navbar
