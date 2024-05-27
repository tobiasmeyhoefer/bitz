import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/LocaleSwitcher'
import LocationChooser from '@/components/settings/LocationChooser'
import { useTranslations } from 'next-intl'
import { DarkmodeToggler } from '@/components/settings/DarkmodeToggler'
import PhoneVerification from '@/components/settings/phone-verifiaction'
import { DeleteAccountButton } from '@/components/settings/delete-account-button'
import ProfilePictureChanger from '@/components/settings/profile-picture-changer'

const Settings = () => {
  const t = useTranslations('Settings')
  return (
    <div className="flex h-full flex-col items-center py-40">
      <h1 className="mb-10 text-3xl">{t('title')}</h1>
      <div className="flex flex-col gap-6">
        <LocaleSwitcher />
        <hr />
        <RegisterPasskey />
        <hr />
        <LocationChooser postcode={t('postcode')} />
        <hr />
        <DarkmodeToggler />
        <hr />
        <PhoneVerification />
        <hr />
        <DeleteAccountButton
          header={t('deleteAccount')}
          title={t('deleteAccountTitle')}
          description={t('deleteAccountDescription')}
          cancel={t('deleteAccountCancel')}
          action={t('deleteAccountAction')}
        />
        <hr />
        <ProfilePictureChanger title={t('imageChangeTitle')} submitTitle={t('submitTitle')} />
      </div>
    </div>
  )
}

export default Settings
