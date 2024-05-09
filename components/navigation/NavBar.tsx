import { auth } from '@/auth'
import { SignOut } from '../auth/sign-out'
import { Button } from '../ui/button'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { IoKeyOutline } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'

const NavBar = async ({ pathname }: { pathname: string }) => {
  const t = await getTranslations('Navbar')
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <nav className="bg-gray-300 absolute left-0 right-0 flex h-[100px] items-center px-4 sm:px-20 justify-between">
      <div className="flex items-center">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link href="/" className="text-blue-500 font-montserrat text-4xl font-bold mr-4 sm:mr-10 block sm:hidden">
                B
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute z-10 mt-2">
              <DropdownMenuItem>
                <Link href="/browse">Entdecken</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/search">Suchen</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile">Meine Bitz</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/" className="text-blue-500 font-montserrat text-4xl font-bold mr-4 sm:mr-10">
            <span className="block sm:hidden">B</span>
            <span className="hidden sm:block">BITZ</span>
          </Link>
        )}
        <div className="hidden sm:flex">
{isLoggedIn && (
  <>
    <Button
      variant={pathname === '/browse' ? 'secondary' : 'ghost'}
      className="mr-5 text-lg font-normal hover:bg-yellow-300 hover:text-black"
      asChild
    >
      <Link href="/browse">Entdecken</Link>
    </Button>
    <Button
      variant={pathname === '/search' ? 'secondary' : 'ghost'}
      className="mr-5 text-lg font-normal hover:bg-yellow-300 hover:text-black"
      asChild
    >
      <Link href="/search">Suchen</Link>
    </Button>
    <Button
      variant={pathname === '/profile' ? 'secondary' : 'ghost'}
      className="text-lg font-normal hover:bg-yellow-300 hover:text-black"
      asChild
    >
      <Link href="/">Meine Bitz</Link>
    </Button>
  </>
)}

        </div>
      </div>
      <ul className="flex">
        {isLoggedIn ? (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaUserCircle className="text-yellow-300 h-12 w-12 p-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute z-10 mt-2">
                <DropdownMenuItem>
                  <Link href="/profile">Profil verwalten</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ) : (
          <>
{isLoggedIn ? (
  <div className="flex space-x-2">
    <Button asChild>
      <SignOut />
    </Button>
  </div>
) : (
  <div className="flex space-x-2">
    <Button asChild>
      <Link href="/auth/login">Anmelden</Link>
    </Button>
  </div>
)}

          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
