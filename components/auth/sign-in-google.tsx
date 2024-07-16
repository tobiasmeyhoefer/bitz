/**
 * Renders a Google sign-in button that, when clicked, initiates the Google sign-in flow.
 * This component is responsible for handling the sign-in process and redirecting the user
 * to the appropriate page after a successful sign-in.
 */
import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { useTranslations } from 'next-intl'

export function SignInGoogle() {
  return (
    <form
      className="w-full"
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <Button className="md:h-[60px] h-[50px] w-full bg-inherit" variant="outline" type="submit">
        {' '}
        <FcGoogle />
      </Button>
    </form>
  )
}
