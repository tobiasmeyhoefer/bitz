import { setOnboardingState } from '@/lib/user-actions'
import { Button } from '../ui/button'
import { redirect } from '@/navigation'
import { useTranslations } from 'next-intl'
const RestartOnboarding = async () => {
  const t = useTranslations('Settings')
  return (
    <form
      className="w-full"
      action={async () => {
        'use server'
        await setOnboardingState(false)
        redirect("/browse")
      }}
    >
      <Button className='w-full'>{t('restartGuide')}</Button>
    </form>
  )
}

export default RestartOnboarding
