import {useTranslations} from 'next-intl';

const Browse = () => {
  const t = useTranslations('Browse');
  return <h1>{t("title")}</h1>
}

export default Browse
