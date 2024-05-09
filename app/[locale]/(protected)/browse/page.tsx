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
    <div className="h-screen">
      <BrowseContent searchTranslations={searchTranslations} />
    </div>
  )
}

export default Browse
