import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/LocaleSwitcher'
import LocationChooser from '@/components/settings/LocationChooser'
import { useTranslations } from 'next-intl'

const Settings = () => {
  const t = useTranslations('Settings')
  return (
    <div className="flex h-full flex-col items-center px-20 py-40">
      <h1 className="mb-10 text-3xl">{t('title')}</h1>
      <div className="flex flex-col gap-6">
        <LocaleSwitcher />
        <RegisterPasskey />
        <LocationChooser postcode={t('postcode')} />
      </div>
    </div>
  )
}

export default Settings
