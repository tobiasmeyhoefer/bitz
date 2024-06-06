import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/LocaleSwitcher'
import { useTranslations } from 'next-intl'
import { DarkmodeToggler } from '@/components/settings/DarkmodeToggler'
import PhoneVerification from '@/components/settings/phone-verifiaction'
import { DeleteAccountButton } from '@/components/settings/delete-account-button'
import ProfileSettings from '@/components/settings/profile-settings'

const Settings = () => {
  const t = useTranslations('Settings')
  return (
    <div className='pt-10 mb-10'>
      <h1 className="mb-10 font-montserrat text-center text-3xl font-bold">{t('title')}</h1>
      <div className="flex lg:flex-row flex-col px-10 gap-10 h-full justify-center pt-10">
        <div >
          <ProfileSettings />
          <hr />
        </div>
        <div className="flex w-[600px] h-full flex-col gap-6">
          <h3 className="text-2xl font-bold">Application</h3>
          <LocaleSwitcher />
          <DarkmodeToggler />
          <hr />
          <h3 className="text-2xl font-bold">Safety</h3>
          <PhoneVerification />
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
