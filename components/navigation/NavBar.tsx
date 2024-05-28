import { auth } from '@/auth'
import { SignOut } from '../auth/sign-out'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import { NavLoginLink, NavItemLink, NavbarItemDropdown, NavMenuDrawer } from './navbarItem'
import dynamic from 'next/dynamic'
import { getUser } from '@/lib/useraction'

const NavBar = async () => {
  const t = await getTranslations('Navbar')
  const session = await auth()
  const users = await getUser()
  const user = users?.[0]
  const isLoggedIn = !!session?.user
  const CubeSceneNav = dynamic(() => import('@/components/explosion/cubeSceneNav'), {
    ssr: false,
  })

  const drawerItems = [
    <NavItemLink
      key={'dil-1'}
      className="py-4 text-center text-2xl hover:no-underline"
      linkTo="/browse"
      text={t('discover')}
    />,
    <NavItemLink
      key={'dil-2'}
      className="py-4 text-center text-2xl hover:no-underline"
      linkTo="/myshop"
      text={t('myBitz')}
    />,
    <NavItemLink
      key={'dil-3'}
      className="py-4 text-center text-2xl hover:no-underline"
      linkTo="/favorites"
      text={t('favorites')}
    />,
    <NavItemLink
      key={'dil-4'}
      className="py-4 text-center text-2xl hover:no-underline"
      linkTo="/settings"
      text={t('settings')}
    ></NavItemLink>,
  ]

  return (
    <nav className="absolute left-0 right-0 flex h-[80px] items-center justify-between px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]">
      <div className="flex items-center">
        {isLoggedIn && (
          <>
            <Link href="/" className="static mr-4 h-[80px] w-[100px] sm:mr-10">
              <CubeSceneNav />
            </Link>
            <div className="hidden sm:flex">
              <NavItemLink className="mr-14" linkTo="/browse" text={t('discover')} />
              <NavItemLink className="mr-14" linkTo="/myshop" text={t('myBitz')} />
            </div>
          </>
        )}
      </div>
      {isLoggedIn ? (
        <>
          <div className="hidden sm:flex">
            <NavbarItemDropdown
              userImgSrc={user?.image}
              signOut={
                <SignOut text={t('logoutButton')} typeText={false} className="mr-3 text-inherit" />
              }
              settingsLinkText={t('settings')}
              favoritesLinkText={t('favorites')}
            />
          </div>
          <div className="block sm:hidden">
            <NavMenuDrawer
              menuItems={drawerItems}
              signOut={
                <div
                  key={'dil-5'}
                  className="flex justify-center py-4 text-center  text-2xl hover:bg-slate-100"
                >
                  <SignOut
                    typeText={true}
                    text={t('logoutButton')}
                    className="w-full text-2xl font-normal hover:no-underline"
                  />
                </div>
              }
            />
          </div>
        </>
      ) : (
        <NavLoginLink text={t('loginButton')} />
      )}
    </nav>
  )
}

export default NavBar
