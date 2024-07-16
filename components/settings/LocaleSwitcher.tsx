/**
 * Renders a locale switcher component that allows the user to select the current locale.
 * The component uses the `useLocale` and `useTranslations` hooks from `next-intl` to get the current locale and translations.
 * The available locales are defined in the `locales` array imported from `@/i18n`.
 * The component renders a select dropdown with the available locales, and updates the current locale when the user selects a new one.
 */
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'
import { locales } from '@/i18n'
import { SelectItem } from '../ui/select'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <div className=''>
      <h5 className='mb-2'>{t('label')}</h5>
      <LocaleSwitcherSelect defaultValue={t('locale', { locale: locale })} label={t('label')}>
        {locales.map((cur) => (
          <SelectItem className='hover:cursor-pointer' key={cur} value={cur}>
            {t('locale', { locale: cur })}
          </SelectItem>
        ))}
      </LocaleSwitcherSelect>
    </div>
  )
}
