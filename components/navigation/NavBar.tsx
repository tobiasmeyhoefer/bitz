import { auth } from '@/auth'
import { SignOut } from '../auth/sign-out'
import { Button } from '../ui/button'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { IoKeyOutline } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'

const NavBar = async ({ pathname }: { pathname: string }) => {
  const t = await getTranslations('Navbar')
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <nav className="bg-gray-300 absolute left-0 right-0 flex h-[100px] items-center px-4 sm:px-20 justify-between">
      <div className="flex items-center">
        {isLoggedIn ? ( 
          <li>
            <DropdownMenu>
              
              <DropdownMenuTrigger>
                <Link href="/" className="text-blue-500 font-montserrat text-4xl font-bold mr-4 sm:mr-10">
                  <span className="sm:hidden">B</span>
                  <span className="hidden sm:inline">BITZ</span>
                </Link>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="absolute z-10 mt-2">
                <DropdownMenuItem>
                  <Button className="bg-yellow-300 text-black hover:bg-orange-400"><Link href="/browse">{t("discover")}</Link></Button>
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                  <Button className="bg-yellow-300 text-black hover:bg-orange-400"><Link href="/search">{t("search")}</Link></Button>
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                  <Button className="bg-yellow-300 text-black hover:bg-orange-400"><Link href="/profile">{t("myBitz")}</Link></Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
              
          </DropdownMenu>
            </li>
        ) : (
          <Link href="/" className="text-blue-500 font-montserrat text-4xl font-bold mr-4 sm:mr-10">
            <span className="block sm:hidden">B</span>
            <span className="hidden sm:block">BITZ</span>
          </Link>
        )}
        <div className="hidden sm:flex">
          {isLoggedIn && (
            <>           
              <Button variant={pathname === '/browse' ? 'secondary' : 'ghost'}
              className="mr-5 text-lg font-normal hover:bg-yellow-300 hover:text-black" asChild>
                <Link href="/browse">{t('discover')}</Link>
              </Button>
              
              <Button variant={pathname === '/search' ? 'secondary' : 'ghost'}
              className="mr-5 text-lg font-normal hover:bg-yellow-300 hover:text-black" asChild>
                <Link href="/search">{t("search")}</Link>
              </Button>
              
              <Button variant={pathname === '/profile' ? 'secondary' : 'ghost'}
              className="text-lg font-normal hover:bg-yellow-300 hover:text-black" asChild>
                <Link href="/">{t("myBitz")}</Link>
              </Button>
            </>
          )}

        </div>
      </div>
      <ul className="flex">
        {isLoggedIn ? (
          
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaUserCircle className="text-yellow-300 h-12 w-12 p-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative z-10 mt-2">
                <DropdownMenuItem>
                  <Button className="bg-yellow-300 text-black hover:bg-orange-400"> <Link href="/profile">{t('profile')}</Link></Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          
        ) : (
            <li className="flex space-x-2">
              <Button className="bg-yellow-300 text-black hover:bg-orange-400"> <Link href="/auth/login">{t('loginButton')}</Link></Button>
            </li>
        )
        }
      </ul>
    </nav>
  )
}

export default NavBar
