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
  return (
    <div
      className={`flex w-full flex-col items-center justify-center  px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      <SearchDialog translations={searchTranslations} />
      <BrowseContent />
    </div>
  )
}

export default Browse
