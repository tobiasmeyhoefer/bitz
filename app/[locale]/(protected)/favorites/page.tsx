/**
 * Renders the Favorites page, displaying a list of the user's favorite products.
 *
 * The page fetches the user's favorite products from the server and displays them in a grid layout using the `CardWithImage` component. If the user has no favorite products, a message is displayed instead.
 *
 * The page is wrapped in a `Suspense` component, which displays a loading skeleton while the data is being fetched.
 *
 * @returns {JSX.Element} The Favorites page component.
 */

import LoadingSkeletonBrowse from '@/components/fallbacks/browse-fallback'
import { CardWithImage } from '@/components/ui/card-with-image'
import { getFavoriteProducts } from '@/lib/product-actions'
import { ProductType } from '@/schema'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

const Favorites = async () => {
  const t = await getTranslations('Favorites')
  const products: ProductType[] | undefined = await getFavoriteProducts()

  return (
    <>
      <h1 className="mt-10 text-center font-montserrat text-3xl font-bold">{t('title')}</h1>
      {products?.length === 0 ? (
        <p className="mt-6 text-center">{t('noFavorites')}</p>
      ) : (
        <Suspense fallback={<LoadingSkeletonBrowse />}>
          <div
            className={`${`h-full`} flex w-full flex-col items-center justify-center px-10 py-20 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
          >
            <div className="mt-[20px] grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 sm:gap-x-14 md:grid-cols-4 md:gap-x-7 lg:grid-cols-5 ">
              {products?.map((p: ProductType, index: number) => (
                <CardWithImage
                  key={`pr-${index}`}
                  className="mx-[5px] my-[0.5rem]"
                  product={products[index]}
                  favIcon
                  editable={false}
                  viewTranslation={t('viewShop')}
                />
              ))}
            </div>
          </div>
        </Suspense>
      )}
    </>
  )
}

export default Favorites
