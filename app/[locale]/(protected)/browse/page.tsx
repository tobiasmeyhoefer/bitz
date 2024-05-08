import { useTranslations } from 'next-intl'
import BrowseContent from '@/components/wrapper/browseContent'
import { SearchTranslations } from '@/lib/types'

const Browse = () => {
  const t = useTranslations('Browse')

  const searchTranslations: SearchTranslations = {
    searchPlaceholder: t('searchPlaceholder'),
    suggestions: t('suggestions'),
  }
  return (
    <div>
      <h1>{t('title')}</h1>
      <BrowseContent searchTranslations={searchTranslations} />
    </div>
  )
}

export default Browse
