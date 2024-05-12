import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/LocaleSwitcher'
import LocationChooser from '@/components/settings/LocationChooser'
import { checkPasskey } from '@/lib/action'
import { useTranslations } from 'next-intl'

const Settings = async () => {
  const t = useTranslations('Settings')
  const hasPasskey = await checkPasskey()
  return (
    <div className="flex h-full flex-col items-center px-20 py-40">
      <h1 className="text-3xl mb-10">{t('title')}</h1>
      <div className="flex flex-col gap-6">
        <LocaleSwitcher />
        {hasPasskey ? <p>Passkey registered</p> : <RegisterPasskey />}
        <LocationChooser city={t('city')} postcode={t('postcode')}/>
      </div>
   </div>
  )
}

export default Settings
