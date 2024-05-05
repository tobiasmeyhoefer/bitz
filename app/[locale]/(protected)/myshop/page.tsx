import {useTranslations} from 'next-intl';

const MyShop = () => {
  const t = useTranslations('MyShop');
  return <h1>{t("title")}</h1>
}

export default MyShop
