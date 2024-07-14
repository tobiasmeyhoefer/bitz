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
import { FaUserCircle } from 'react-icons/fa'
import { Separator } from '@/components/ui/separator'
import { NavbarItemDropdownProps, NavbarItemLinkProps, NavMenuDrawerProps } from '@/lib/types'

type NavLoginProps = {
  text: string
}

const NavItemLink = (props: NavbarItemLinkProps) => {
  const pathname = usePathname()

  return (
    <Link
      className={cn(
        `bg-none text-left text-lg font-normal ${pathname === props.linkTo ? 'text-inherit underline underline-offset-8' : ' hover:underline hover:underline-offset-8'} hover:bg-none`,
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
      <Link href="/auth/login">
        <Button className="bg-primary-hover">{text}</Button>
      </Link>
    )
  )
}

const NavbarItemDropdown = (props: NavbarItemDropdownProps) => {
  'use client'
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger className="outline-none ">
        {props.userImgSrc ? (
          <Image
            src={props.userImgSrc!}
            width={40}
            height={40}
            className="rounded-full"
            alt="User Image"
            style={{ objectFit: 'cover', height: '40px' }}
            onClick={() => setOpen(!open)}
          />
        ) : (
          <FaUserCircle className="h-[45px] w-[45px]" color="gray" onClick={() => setOpen(!open)} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent onPointerDownOutside={() => setOpen(false)}>
        {/* <DropdownMenuLabel className="text-left">Menu</DropdownMenuLabel> */}
        <DropdownMenuItem className="p-0" onClick={() => setOpen(false)}>
          <NavItemLink
            className="w-full px-3 py-2 text-left text-sm no-underline hover:no-underline"
            text={props.favoritesLinkText}
            linkTo="/favorites"
          ></NavItemLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" onClick={() => setOpen(false)}>
          <NavItemLink
            className="w-full px-3 py-2 text-left text-sm no-underline hover:no-underline"
            text={props.settingsLinkText}
            linkTo="/settings"
          ></NavItemLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0" onClick={() => setOpen(false)}>
          <NavItemLink
            className="px-3 py-2 text-left text-sm no-underline hover:no-underline"
            text="Transaktionen"
            linkTo="/transactions"
          ></NavItemLink>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem className="p-0 font-normal">
          <div className="w-full px-3 py-2">{props.signOut}</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const NavMenuDrawer = (props: NavMenuDrawerProps) => {
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
          className="text-bg-primary-foreground h-fit bg-transparent p-0 shadow-none outline-none ring-0 hover:bg-transparent hover:text-primary-hover focus-visible:ring-0 "
        >
          <TbMenu className="h-[30px] w-[40px] outline-none " />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-smd mx-auto w-full border-0 bg-primary-foreground text-primary">
        {props.menuItems.map((item: JSX.Element, index: number) => {
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
