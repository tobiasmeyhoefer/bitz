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
      <Button className="h-[60px] w-full bg-inherit" variant="outline" type="submit">
        {' '}
        <FaGithub />
      </Button>
    </form>
  )
}
