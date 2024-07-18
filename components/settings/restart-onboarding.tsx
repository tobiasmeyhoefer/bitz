/**
 * Provides a form component that allows the user to restart the onboarding process.
 * When the form is submitted, it sets the onboarding state to false and redirects the user to the "/browse" page.
 */
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
      <Button variant={"outline"} className='w-full'>{t('restartGuide')}</Button>
    </form>
  )
}

export default RestartOnboarding
