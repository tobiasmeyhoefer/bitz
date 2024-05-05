import {useTranslations} from 'next-intl';

const Search = () => {
  const t = useTranslations('Search');
  return <h1>{t("title")}</h1>
}

export default Search
