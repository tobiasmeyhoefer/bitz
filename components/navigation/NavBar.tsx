import { auth } from '@/auth'
import { SignOut } from '../auth/sign-out'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import { FaUserCircle } from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { NavLoginLink, NavItemLink } from './navbarItem'

const NavBar = async () => {
  const t = await getTranslations('Navbar')
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <nav className="absolute left-0 right-0 flex h-[80px] items-center justify-between px-4 sm:px-10">
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Link
                    href="/"
                    className="mr-4 font-montserrat text-4xl font-bold text-blue-500 sm:mr-10"
                  >
                    <span>B</span>
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute z-10 mt-2">
                  <DropdownMenuItem>
                    <NavItemLink linkTo="/browse" text={t('discover')} />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavItemLink linkTo="/myshop" text={t('myBitz')} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link
              href="/"
              className="mr-4 font-montserrat text-4xl font-bold text-blue-500 sm:mr-10"
            >
              <span className="hidden sm:inline">BITZ</span>
            </Link>
          </>
        ) : (
          <Link
            href="/"
            className="mr-4 font-montserrat text-4xl font-bold text-blue-500 sm:mr-10"
          >
            <span className="block sm:hidden">B</span>
            <span className="hidden sm:block">BITZ</span>
          </Link>
        )}
        <div className="hidden sm:flex">
          {isLoggedIn && (
            <>
              <NavItemLink linkTo="/browse" text={t('discover')} />
              <NavItemLink linkTo="/myshop" text={t('myBitz')} />
            </>
          )}
        </div>
      </div>
      <ul className="flex">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaUserCircle className="h-12 w-12 p-1 text-yellow-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative z-10 mt-2">
              <DropdownMenuItem>
                <NavItemLink linkTo="/settings" text={t('profile')} />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <NavLoginLink text={t('loginButton')} />
        )}
      </ul>
    </nav>
  )
}

export default NavBar
