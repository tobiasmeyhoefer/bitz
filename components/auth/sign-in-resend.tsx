import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl'
import { saveUserName } from '@/lib/useraction'

export function SignInResend() {
  const t = useTranslations('LoginForm')
  return (
    <form
      className="flex flex-col items-center gap-4"
      action={async (formData) => {
        'use server'
        const name = formData.get('name')
        await signIn('resend', formData)
        if (typeof name === 'string') {
          await saveUserName(name)
        }
      }}
    >
      <Input className="h-[60px] w-full p-4" type="email" name="email" placeholder="john@doe.com" />
      <Input
        className="h-[60px] w-full p-4"
        type="text"
        name="name"
        placeholder="John Doe"
        pattern="^[a-zA-ZäöüÄÖÜß\s]*$"
        required
      />
      <Button className=" h-[60px] w-full" variant={'default'} type="submit">
        {t('loginButton')}
      </Button>
    </form>
  )
}
