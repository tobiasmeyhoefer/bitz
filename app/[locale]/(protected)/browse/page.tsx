import { useTranslations } from 'next-intl'
import BrowseContent from '@/components/browse/browse-content'
import { SearchTranslations } from '@/lib/types'
import { Suspense } from 'react'
import LoadingSkeletonBrowse from '@/components/fallbacks/browse-fallback'

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
  const addressChooserTranslations = {
    popupTitle: t('popupTitle'),
    addressError: t('addressError'),
    housenumberError: t('housenumberError'),
    SuccessToast: t('SuccessToast'),
    submit: t('submit'),
  }

  const filterTranslations = {
    category: t('category'),
    location: t('location'),
    howtobuy: t('howtobuy'),
    price: t('price'),
    chooseCategory: t('chooseCategory'),
    chooseLocation: t('chooseLocation'),
    buyable: t('buyable'),
    delete: t('delete'),
  }

  return (
    <Suspense fallback={<LoadingSkeletonBrowse />}>
      <BrowseContent
        searchTranslations={searchTranslations}
        sortTranslations={sortTranslations}
        addressChooserTranslations={addressChooserTranslations}
        filterTranslations={filterTranslations}
        viewTranslations={t('viewShop')}
      />
    </Suspense>
  )
}

export default Browse
