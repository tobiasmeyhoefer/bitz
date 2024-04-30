import { auth } from '@/auth'
import Link from 'next/link'
import { SignOut } from '../auth/sign-out'
import { Button } from '../ui/button'

const NavBar = async () => {
  // const session = await auth()
  // console.log(session?.user)
  // const isLoggedIn = !!session?.user

  const isLoggedIn = true

  return (
    <nav className="absolute left-0 right-0 flex h-[100px] items-center justify-between px-20">
      <Link href={'/'}>Bitz</Link>
      <ul className="flex">
        {!isLoggedIn ? (
          <li className="flex gap-10">
            <Button>
              <Link href={'/auth/login'}>anmelden</Link>
            </Button>
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
