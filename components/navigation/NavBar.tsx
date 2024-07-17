/**
 * The `NavBar` component is the main navigation bar for the application. It displays different navigation links and user-related actions based on whether the user is logged in or not.

 * The component uses the `auth` and `getUser` functions to retrieve the current user session and user information. It then renders the appropriate navigation links and user actions based on the user's login status.

 * The navigation links include:
 * - Discover page ("/browse")
 * - My Bitz page ("/myshop")
 * - Favorites page ("/favorites")
 * - Transactions page ("/transactions")
 * - Conversations page ("/conversations")
 * - Settings page ("/settings")

 * The user actions include:
 * - Sign out button
 * - Settings link
 * - Favorites link
 * - Transactions link

 * The component also includes a responsive design, with a mobile-friendly drawer menu for the navigation links and user actions.
 */
import { auth } from '@/auth'
import { getUser } from '@/lib/user-actions'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { SignOut } from '../auth/sign-out'
import { NavItemLink, NavLoginLink, NavMenuDrawer, NavbarItemDropdown } from './navbar-item'

const NavBar = async () => {
  const t = await getTranslations('Navbar')
  const session = await auth()
  let user
  if (session) {
    user = await getUser()
  }
  const isLoggedIn = !!session?.user
  const CubeSceneNav = dynamic(() => import('@/components/explosion/cube-scene-nav'), {
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
      linkTo="/my-shop"
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
      text={t('transactions')}
    ></NavItemLink>,
    <NavItemLink
      key={'dil-4'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/conversations"
      text={t('conversations')}
    ></NavItemLink>,
    <NavItemLink
      key={'dil-4'}
      className="w-full py-4 text-center text-2xl hover:no-underline"
      linkTo="/settings"
      text={t('settings')}
    ></NavItemLink>,
  ]

  return (
    <nav className="z-10 flex h-[80px] w-full items-center justify-between px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]">
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
              transactionsLinkText={t('transactions')}
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
