import { auth } from '@/auth'
import { SignOut } from '../auth/sign-out'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import { SlSettings } from 'react-icons/sl'
import { TbMenu } from 'react-icons/tb'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { NavLoginLink, NavItemLink } from './navbarItem'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'
import { FaBullseye } from 'react-icons/fa'

const NavBar = async () => {
  const t = await getTranslations('Navbar')
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <nav className="absolute left-0 right-0 flex h-[80px] items-center justify-between px-4 sm:px-10">
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link
              href="/"
              className="mr-4 font-montserrat text-4xl font-bold text-blue-500 sm:mr-10"
            >
              <span>BITZ</span>
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
              <NavItemLink
                className="mr-10"
                linkTo="/browse"
                text={t('discover')}
              />
              <NavItemLink
                className="mr-10"
                linkTo="/myshop"
                text={t('myBitz')}
              />
            </>
          )}
        </div>
      </div>
      {isLoggedIn ? (
        <>
          <div className="hidden sm:flex">
            <NavItemLink
              linkTo="/settings"
              icon={<SlSettings className="mr-3 h-[20px] w-[20px]" />}
            ></NavItemLink>
            <SignOut typeText={false} />
          </div>
          <div className="block sm:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="h-fit bg-transparent p-0 text-black shadow-none hover:bg-transparent hover:text-black ">
                  <TbMenu className="h-[20px] w-[20px]" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-smd mx-auto w-full border-0 bg-black p-3">
                <NavItemLink
                  className="mr-10 py-2 text-2xl text-white  hover:underline hover:underline-offset-8"
                  linkTo="/browse"
                  text={t('discover')}
                />
                <NavItemLink
                  className="mr-10 py-2 text-2xl text-white"
                  linkTo="/myshop"
                  text={t('myBitz')}
                />
                <NavItemLink
                  className="mr-10 py-2 text-2xl text-white"
                  linkTo="/settings"
                  text={t('settings')}
                ></NavItemLink>
                <SignOut
                  typeText={true}
                  text={t('logoutButton')}
                  className="mr-10 py-2 text-2xl text-white hover:text-white hover:underline hover:underline-offset-8"
                />
              </DrawerContent>
            </Drawer>
          </div>
        </>
      ) : (
        <NavLoginLink text={t('loginButton')} />
      )}
    </nav>
  )
}

export default NavBar
