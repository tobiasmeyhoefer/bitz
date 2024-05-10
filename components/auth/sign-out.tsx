import { signOut } from '@/auth'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'

export function SignOut() {
  const t = useTranslations('Navbar')
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button
        className="bg-transparent text-black hover:bg-black hover:text-white"
        type="submit"
      >
        {t('logoutButton')}
      </Button>
    </form>
  )
}
