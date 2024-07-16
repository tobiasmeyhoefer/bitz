/**
 * A React component that renders a sign-out button.
 *
 * @param props - The component props.
 * @param props.typeText - Whether to display the text or not.
 * @param props.className - An optional CSS class name to apply to the button.
 * @param props.text - The text to display on the button.
 * @returns A React element representing the sign-out button.
 */
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
