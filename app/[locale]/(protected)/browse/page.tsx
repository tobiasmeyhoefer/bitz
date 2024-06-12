import BrowseContent from '@/components/browse/browseContent'
import SearchDialog from '@/components/browse/SearchDialog'
import { SearchTranslations } from '@/lib/types'
import { useTranslations } from 'next-intl'

const Browse = () => {
  const t = useTranslations('Browse')

  const searchTranslations: SearchTranslations = {
    searchPlaceholder: t('searchPlaceholder'),
    suggestions: t('suggestions'),
  }
  const sortTranslations = {
    sortBy: t('sortby'),
    date: t('date'),
    price: t('price'),
  }
  return (
    <BrowseContent searchTranslations={searchTranslations} sortTranslations={sortTranslations} />
  )
}

export default Browse
