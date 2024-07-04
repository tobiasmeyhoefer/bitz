import LoadingSkeletonBrowse from '@/components/fallbacks/browse-fallback'
import { CardWithImage } from '@/components/ui/cardWithImage'
import { getFavoriteProducts } from '@/lib/product-actions'
import { ProductType } from '@/schema'
import { Suspense } from 'react'

const Favorites = async () => {
  const products: ProductType[] | undefined = await getFavoriteProducts()
  // await fetch('http://localhost:3000/api/mail/welcome', {
  //   method: 'POST',
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify({ to: 'tobias.meyhoefer02@gmail.com' }),
  // })

  return (
    <>
      <h1 className="mt-10 text-center font-montserrat text-3xl font-bold">FAVORITEN</h1>
      {products?.length === 0 ? (
        <p className="mt-6 text-center">
          Du hast noch keine Favoriten. Du kannst welche hinzufügen indem du den like button drückst
        </p>
      ) : (
        <Suspense fallback={<LoadingSkeletonBrowse />}>
          <div
            className={`${`h-full`} flex w-full flex-col items-center justify-center px-10 py-20 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
          >
            <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
              {products?.map((p: ProductType, index: number) => (
                <CardWithImage
                  key={`pr-${index}`}
                  className="mx-[5px] my-[0.5rem]"
                  product={products[index]}
                  favIcon
                  editable={false}
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
