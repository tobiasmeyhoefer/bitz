import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { useTranslations } from 'next-intl'

export function SignInGoogle() {
  const t = useTranslations('LoginForm')
  return (
    <form
      className="w-full"
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <Button className="h-[60px] w-full bg-inherit" variant="outline" type="submit">
        {' '}
        <FcGoogle />
      </Button>
    </form>
  )
}
