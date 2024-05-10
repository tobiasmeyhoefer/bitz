'use client'

import { Link, usePathname } from '@/navigation'
import { Button } from '../ui/button'

type NavbarItemLinkProps = {
  linkTo: string
  text?: string
  icon?: any
}
type NavLoginProps = {
  text: string
}

const NavItemLink = (props: NavbarItemLinkProps) => {
  const pathname = usePathname()

  return (
    <Link
      className={`mr-10 text-lg font-normal ${pathname === props.linkTo ? 'text-gray-400' : 'text-black hover:underline hover:underline-offset-8'} hover:bg-none`}
      href={props.linkTo}
    >
      {props.text}
    </Link>
  )
}

const NavLoginLink = ({ text }: NavLoginProps) => {
  const pathname = usePathname()
  return (
    pathname !== '/auth/login' && (
      <Button className="bg-transparent text-black hover:bg-black hover:text-white">
        <Link href="/auth/login">{text}</Link>
      </Button>
    )
  )
}

export { NavItemLink, NavLoginLink }
