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
import { SlSettings, SlHeart } from 'react-icons/sl'
import { TbMenu } from 'react-icons/tb'
import { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { Separator } from '@/components/ui/separator'

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
        `bg-none text-lg font-normal ${pathname === props.linkTo ? 'cursor-default text-inherit underline underline-offset-8' : ' hover:underline hover:underline-offset-8'} hover:bg-none`,
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
      <Button className=" hover:bg-gray-700 hover:text-white">
        <Link href="/auth/login">{text}</Link>
      </Button>
    )
  )
}

type NavbarItemDropdownProps = {
  userImgSrc?: string
  signOut?: any
  signOutLinkText?: string
  settingsLinkText?: string
  favoritesLinkText?: string
}

const NavbarItemDropdown = (props: NavbarItemDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {!props.userImgSrc ? (
          <Image
            src="/test_img.jpg" // TODO: {props?.userImgSrc as string}
            width={50}
            height={50}
            className="rounded-full"
            alt="User Image"
            style={{ objectFit: 'cover', height: '50px' }}
          />
        ) : (
          <HiUserCircle className="h-[40px] w-[40px]" color="gray" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuItem>
          <NavItemLink
            linkTo="/favorites"
            icon={<SlHeart className="mr-3 h-[20px] w-[20px]" />}
          ></NavItemLink>
          <div>{props.favoritesLinkText}</div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavItemLink
            linkTo="/settings"
            icon={<SlSettings className="mr-3 h-[20px] w-[20px]" />}
          ></NavItemLink>
          <div>{props.settingsLinkText}</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="pl-[40px] font-normal">
          <div className=" mr-3 h-[20px] w-[20px]">{props.signOut}</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const NavMenuDrawer = (props: any) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          onClick={() => setDrawerOpen(true)}
          className="h-fit bg-transparent p-0 text-black shadow-none hover:bg-transparent hover:text-black "
        >
          <TbMenu className="h-[30px] w-[40px]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-smd mx-auto w-full border-0 bg-white">
        {props.menuItems.map((item: any, index: number) => {
          if (pathname === item.props.linkTo)
            item.props.className = cn(item.props.className, 'text-black no-underline')
          return (
            <div
              className={`flex justify-center hover:bg-slate-100 ${index === 0 && `rounded-t-xl`} ${pathname === item.props.linkTo && 'cursor-default bg-slate-100 text-black no-underline'}`}
              onClick={() => setDrawerOpen(false)}
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
