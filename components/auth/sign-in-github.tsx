/**
 * Renders a sign-in button for GitHub authentication.
 *
 * This component renders a button that, when clicked, initiates the GitHub sign-in
 * flow using the `signIn` function from the `@/auth` module. The button is styled
 * with a GitHub logo and the text "Sign in with GitHub".
 */
import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { FaGithub } from 'react-icons/fa'
import { useTranslations } from 'next-intl'

export function SignInGithub() {
  const t = useTranslations('LoginForm')
  return (
    <form
      className="w-full"
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <Button className="md:h-[60px] h-[50px] w-full bg-inherit" variant="outline" type="submit">
        {' '}
        <FaGithub />
      </Button>
    </form>
  )
}
