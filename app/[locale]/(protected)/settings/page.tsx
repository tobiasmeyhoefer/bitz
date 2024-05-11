import LocaleSwitcher from "@/components/settings/LocaleSwitcher"
import LocationChooser from "@/components/settings/LocationChooser"
import { useTranslations } from "next-intl"

const Settings = () => {
  const t = useTranslations('Settings')
  return (
    <div className="h-full px-20 py-40 flex flex-col items-center">
      <h1 className="text-3xl mb-10">{t('title')}</h1>
      <LocaleSwitcher/>
      <LocationChooser city={t('city')} postcode={t('postcode')}/>
    </div>
  )
}

export default Settings
