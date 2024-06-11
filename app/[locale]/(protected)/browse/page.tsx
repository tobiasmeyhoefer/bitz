import { useTranslations } from 'next-intl'
import BrowseContent from '@/components/browse/browseContent'
import { SearchTranslations } from '@/lib/types'

const Browse = () => {
  const t = useTranslations('Browse')

  const searchTranslations: SearchTranslations = {
    searchPlaceholder: t('searchPlaceholder'),
    suggestions: t('suggestions'),
  }
  return <BrowseContent searchTranslations={searchTranslations} />
}

export default Browse
