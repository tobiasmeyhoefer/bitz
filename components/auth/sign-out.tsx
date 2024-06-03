import { signOut } from '@/auth'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

type SignOutProps = {
  typeText: boolean
  className?: string
  text: string
}

export function SignOut(props: SignOutProps) {
  const t = useTranslations('Navbar')
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button
        className={cn(
          'h-fit w-full bg-transparent p-0 text-black shadow-none hover:bg-transparent',
          props.className,
        )}
        type="submit"
      >
        {props.text}
      </Button>
    </form>
  )
}
