import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherSelect from './locale-switcher-select'
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