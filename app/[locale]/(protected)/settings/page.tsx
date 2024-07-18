/**
 * Renders the Settings page component, which includes various settings-related components such as profile settings, locale switcher, darkmode toggler, phone verification, and more.
 *
 * The Settings component is wrapped in a Suspense component that displays a loading skeleton while the child components are being loaded.
 *
 * The component uses the `useTranslations` hook from `next-intl` to retrieve translations for the various settings-related strings.
 *
 * @returns {JSX.Element} The rendered Settings page component
 */
import RegisterPasskey from '@/components/auth/register-passkey'
import LocaleSwitcher from '@/components/settings/locale-switcher'
import { useTranslations } from 'next-intl'
import { DarkmodeToggler } from '@/components/settings/darkmode-toggler'
import PhoneVerification from '@/components/settings/phone-verifiaction'
import { DeleteAccountButton } from '@/components/settings/delete-account-button'
import ProfileSettings from '@/components/settings/profile-settings'
import RestartOnboarding from '@/components/settings/restart-onboarding'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'

const Settings = () => {
  const t = useTranslations('Settings')
  const verificationTranslations = {
    notVerified: t('Verification.notVerified'),
    verificationAborted: t('Verification.verificationAborted'),
    verified: t('Verification.verified'),
    wrongNumber: t('Verification.wrongNumber'),
    verifyNow: t('Verification.verifyNow'),
    typeInNumber: t('Verification.typeInNumber'),
    numberNotice: t('Verification.numberNotice'),
    continue: t('Verification.continue'),
    enterCode: t('Verification.enterCode'),
    cancel: t('Verification.cancel'),
    submit: t('Verification.submit'),
  }
  const passkeyProps = {
    registerPasskey: t('registerPasskey'),
    registerPasskeySuccess: t('registerPasskeySuccess'),
  }

  return (
    <div className="py-12">
      <h1 className="mb-16 text-center font-montserrat text-xl font-bold md:text-3xl">
        {t('title')}
      </h1>
      <div className="flex h-full flex-col justify-center gap-10 px-10 lg:flex-row">
        <ProfileSettings />
        <hr />
        <div className="flex h-full w-full max-w-[600px] flex-col gap-6">
          <h3 className="text-2xl font-bold">{t('app')}</h3>
          <LocaleSwitcher />
          <DarkmodeToggler translations={{ theme: t('theme') }} />
          <hr />
          <h3 className="text-2xl font-bold">{t('safety')}</h3>
          <PhoneVerification translations={verificationTranslations} />
          <RestartOnboarding />
          <RegisterPasskey translations={passkeyProps} />
          <DeleteAccountButton
            header={t('deleteAccount')}
            title={t('deleteAccountTitle')}
            description={t('deleteAccountDescription')}
            cancel={t('deleteAccountCancel')}
            action={t('deleteAccountAction')}
          />
        </div>
      </div>
      <Link href={'https://www.youtube.com'} className="fixed bottom-8 left-8" target="_blank">
        <Button className="">Ich brauche Hilfe</Button>
      </Link>
    </div>
  )
}

export default Settings
