import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl'
import { cookies } from 'next/headers'

export function SignInResend() {
  const t = useTranslations('LoginForm')
  return (
    <form
      className="flex flex-col items-center gap-4"
      action={async (formData) => {
        'use server'
        const email = formData.get('email')
        const name = formData.get('name')
        cookies().set('email', email?.toString()!)
        cookies().set('name', name?.toString()!)
        await signIn('resend', formData)
      }}
    >
      <Input className="h-[60px] w-full p-4" type="email" name="email" placeholder="john@doe.com" />
      <p className="h-2 w-full px-2 text-start"> Enter your Name</p>
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
