import { auth } from '@/auth'
import { getUser } from '@/lib/user-actions'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { SignOut } from '../auth/sign-out'
import { NavItemLink, NavLoginLink, NavMenuDrawer, NavbarItemDropdown } from './navbarItem'

const NavBar = async () => {
  const t = await getTranslations('Navbar')
  const session = await auth()
  let user
  if (session) {
    user = await getUser()
  }
  const isLoggedIn = !!session?.user
  const CubeSceneNav = dynamic(() => import('@/components/explosion/cubeSceneNav'), {
    ssr: false,
  })

  const drawerItems = [
    <NavItemLink
      key={'dil-1'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/browse"
      text={t('discover')}
    />,
    <NavItemLink
      key={'dil-2'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/myshop"
      text={t('myBitz')}
    />,
    <NavItemLink
      key={'dil-3'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/favorites"
      text={t('favorites')}
    />,
    <NavItemLink
      key={'dil-4'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/transactions"
      text="Transaktionen"
    ></NavItemLink>,
    <NavItemLink
      key={'dil-4'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/conversations"
      text="Konversationen"
    ></NavItemLink>,
    <NavItemLink
      key={'dil-4'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/settings"
      text={t('settings')}
    ></NavItemLink>,
  ]

  return (
    <nav className="left-0 right-0 z-10 flex h-[80px] w-screen items-center justify-between px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]">
      <div className="flex items-center">
        {isLoggedIn && (
          <>
            <Link href="/" className="static mr-4 h-[80px] w-[100px] sm:mr-10">
              <CubeSceneNav />
            </Link>
            <div className="hidden md:flex">
              <NavItemLink className="mr-14" linkTo="/browse" text={t('discover')} />
              <NavItemLink className="mr-14" linkTo="/myshop" text={t('myBitz')} />
              <NavItemLink className="mr-14" linkTo="/conversations" text={t('conversations')} />
            </div>
          </>
        )}
      </div>
      {isLoggedIn ? (
        <>
          <div className="hidden md:flex">
            <NavbarItemDropdown
              userImgSrc={user?.image}
              signOut={
                <SignOut text={t('logoutButton')} typeText={false} className="mr-3 text-inherit" />
              }
              settingsLinkText={t('settings')}
              favoritesLinkText={t('favorites')}
            />
          </div>
          <div className="block md:hidden">
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
