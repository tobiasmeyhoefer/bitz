import { auth } from '@/auth'
import { SignOut } from '../auth/sign-out'
import { Button } from '../ui/button'
import { Link } from '@/navigation'
import {useTranslations} from 'next-intl';
import { getTranslations } from 'next-intl/server';

const NavBar = async () => {
  const t = await getTranslations("Navbar")
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <nav className="absolute left-0 right-0 flex h-[100px] items-center justify-between px-20">
      <Link href={'/'}>Bitz</Link>
      <ul className="flex">
        {!isLoggedIn ? (
          <li className="flex gap-10">
            <Button>
              <Link href={'/auth/login'}>{t("loginButton")}</Link>
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
