import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/LocaleSwitcher'
import { useTranslations } from 'next-intl'
import { DarkmodeToggler } from '@/components/settings/DarkmodeToggler'
import PhoneVerification from '@/components/settings/phone-verifiaction'
import { DeleteAccountButton } from '@/components/settings/delete-account-button'
import ProfileSettings from '@/components/settings/profile-settings'
import RestartOnboarding from '@/components/settings/restart-onboarding'

const Settings = () => {
  const t = useTranslations('Settings')
  return (
    <div className="mb-10 pt-10">
      <h1 className="mb-10 text-center font-montserrat text-3xl font-bold">{t('title')}</h1>
      <div className="flex h-full flex-col justify-center gap-10 px-10 pt-10 lg:flex-row">
        <div>
          <ProfileSettings />
          <hr />
        </div>
        <div className="flex h-full w-[600px] flex-col gap-6">
          <h3 className="text-2xl font-bold">{t('app')}</h3>
          <LocaleSwitcher />
          <DarkmodeToggler />
          <hr />
          <h3 className="text-2xl font-bold">{t('safety')}</h3>
          <PhoneVerification />
          <RestartOnboarding />
          <RegisterPasskey />
          <DeleteAccountButton
            header={t('deleteAccount')}
            title={t('deleteAccountTitle')}
            description={t('deleteAccountDescription')}
            cancel={t('deleteAccountCancel')}
            action={t('deleteAccountAction')}
          />
        </div>
      </div>
    </div>
  )
}

export default Settings
