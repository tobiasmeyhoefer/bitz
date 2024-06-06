'use client'

import { Link, usePathname } from '@/navigation'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import Image from 'next/image'
import { TbMenu } from 'react-icons/tb'
import { useState, useEffect } from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { FaUserCircle } from 'react-icons/fa'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'


type NavbarItemLinkProps = {
  linkTo: string
  text?: string
  icon?: any
  className?: string
}

type NavLoginProps = {
  text: string
}

const NavItemLink = (props: NavbarItemLinkProps) => {
  const pathname = usePathname()

  return (
    <Link
      className={cn(
        `bg-none text-left text-lg font-normal ${pathname === props.linkTo ? 'cursor-default text-inherit underline underline-offset-8' : ' hover:underline hover:underline-offset-8'} hover:bg-none`,
        props.className,
      )}
      href={props.linkTo}
    >
      {props.icon && props.icon}
      {props.text && props.text}
    </Link>
  )
}

const NavLoginLink = ({ text }: NavLoginProps) => {
  const pathname = usePathname()
  return (
    pathname !== '/auth/login' && (
      // hover:bg-gray-700 hover:text-white
      <Button className="bg-primary-hover">
        <Link href="/auth/login">{text}</Link>
      </Button>
    )
  )
}

type NavbarItemDropdownProps = {
  userImgSrc?: string | null
  signOut?: any
  signOutLinkText?: string
  settingsLinkText?: string
  favoritesLinkText?: string
}

const NavbarItemDropdown = (props: NavbarItemDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {props.userImgSrc ? (
          <Image
            src={props.userImgSrc!} // TODO: {props?.userImgSrc as string}
            width={50}
            height={50}
            className="rounded-full"
            alt="User Image"
            style={{ objectFit: 'cover', height: '50px' }}
          />
        ) : (
          <FaUserCircle className="h-[45px] w-[45px]" color="gray" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-left">Menu</DropdownMenuLabel>
        <DropdownMenuItem>
          <NavItemLink
            className="w-full text-left text-sm no-underline hover:no-underline"
            text={props.favoritesLinkText}
            linkTo="/favorites"
          ></NavItemLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavItemLink
            className="w-full text-left text-sm no-underline hover:no-underline"
            text={props.settingsLinkText}
            linkTo="/settings"
          ></NavItemLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavItemLink
            className="text-left text-sm no-underline hover:no-underline"
            text="Transaktionen"
            linkTo="/transactions"
          ></NavItemLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="font-normal">
          <div className="w-full">{props.signOut}</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const NavMenuDrawer = (props: any) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          onClick={() => setDrawerOpen(true)}
          className="text-bg-primary-foreground h-fit bg-transparent p-0 shadow-none hover:bg-transparent hover:text-primary-hover "
        >
          <TbMenu className="h-[30px] w-[40px]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-smd mx-auto w-full border-0 bg-primary-foreground text-primary">
        {props.menuItems.map((item: any, index: number) => {
          if (pathname === item.props.linkTo)
            item.props.className = cn(item.props.className, ' no-underline')
          return (
            <div
              className={`flex justify-center hover:bg-slate-100 ${index === 0 && `rounded-t-xl`} ${pathname === item.props.linkTo && 'cursor-default bg-slate-100 text-primary no-underline'}`}
              onClick={() => {
                setDrawerOpen(false)
              }}
              key={item.key}
            >
              {item}
            </div>
          )
        })}
        <Separator />
        {props.signOut}
      </DrawerContent>
    </Drawer>
  )
}

export { NavItemLink, NavLoginLink, NavbarItemDropdown, NavMenuDrawer }
