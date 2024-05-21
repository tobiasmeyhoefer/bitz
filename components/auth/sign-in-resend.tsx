import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl'

export function SignInResend() {
  const t = useTranslations('LoginForm')
  return (
    <form
      className="flex flex-col items-center gap-4"
      action={async (formData) => {
        'use server'
        await signIn('resend', formData)
      }}
    >
      <Input className="h-[60px] w-full p-4" type="text" name="email" placeholder="john@doe.com" />

      <Button className=" h-[60px] w-full bg-inherit" variant={'outline'} type="submit">
        {t('loginButton')}
      </Button>
    </form>
  )
}
