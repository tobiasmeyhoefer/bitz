import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/LocaleSwitcher'
import LocationChooser from '@/components/settings/LocationChooser'
import { checkPasskey } from '@/lib/action'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/auth'
import { DarkmodeToggler } from '@/components/settings/DarkmodeToggler'

const Settings = async () => {
  const t = await getTranslations('Settings')
  const hasPasskey = await checkPasskey()
  const session = await auth()
  const id = session?.user?.id
  return (
    <div className="flex h-full flex-col items-center px-20 py-40">
      <h1 className="mb-10 text-3xl">{t('title')}</h1>
      <div className="flex flex-col gap-6">
        <LocaleSwitcher />
        {hasPasskey ? <p>Passkey registered</p> : <RegisterPasskey />}
        <LocationChooser postcode={t('postcode')} userId={id!} />
        <DarkmodeToggler />
      </div>
    </div>
  )
}

export default Settings
