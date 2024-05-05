import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { FaSignInAlt } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import {useTranslations} from 'next-intl';

export function SignInGoogle() {
  const t = useTranslations("LoginForm")
  return (
    <form
      className="flex flex-col gap-6"
      action={async (formData) => {
        'use server'
        await signIn('google')
      }}
    >
      <p>{t("loginGoogleMessage")}</p>
      <Button className="h-[60px] w-full" variant="outline" type="submit">
        {' '}
        <FcGoogle />
      </Button>
    </form>
  )
}
