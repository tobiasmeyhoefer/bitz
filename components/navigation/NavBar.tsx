import { auth } from '@/auth'
import Link from 'next/link'
import { SignOut } from '../auth/sign-out'

const NavBar = async () => {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <nav className="absolute left-0 right-0 flex h-[100px] items-center justify-between px-20">
      <Link href={'/'}>Bitz</Link>
      <ul className="flex">
        {!isLoggedIn ? (
          <li className="flex gap-10">
            <Link href={'/auth/login'}>anmelden</Link>
          </li>
        ) : null}
        {isLoggedIn ? (
          <li>
            <SignOut />
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export default NavBar
