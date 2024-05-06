import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import {locales} from '@/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
import { SelectItem } from '../ui/select';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {locales.map((cur) => (
        <SelectItem key={cur} value={cur}>{t('locale', {locale: cur})}</SelectItem>
      ))}
    </LocaleSwitcherSelect>
  );
}
