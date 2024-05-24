import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { useTranslations } from 'next-intl'

export function SignInGoogle() {
  const t = useTranslations('LoginForm')
  return (
    <form
      className="flex flex-col gap-6"
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <p className='text-neutral-600 text-sm'>{t('loginGoogleMessage')}</p>
      <Button className="h-[60px] w-full bg-inherit" variant="outline" type="submit">
        {' '}
        <FcGoogle />
      </Button>
    </form>
  )
}
