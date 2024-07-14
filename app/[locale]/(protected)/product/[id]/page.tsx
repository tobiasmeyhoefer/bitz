import { Button } from '@/components/ui/button'
import { ProductImageCarousel } from '@/components/products/productImgCarousel'
import ProductInfoCard from '@/components/products/productInfoCard'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import { getProductById } from '@/lib/product-actions'
import { getUser } from '@/lib/user-actions'
import { ProductType } from '@/schema'

export default async function Page({ params }: { params: { id: string } }) {
  const t = await getTranslations('Product')
  const productId = params.id

  const product: ProductType = await getProductById(productId)
  const user = await getUser()
  let isOwner = false
  if (user.id == product.sellerId) {
    isOwner = true
  }

  const unfilteredImgs = [
    product.imageUrl1,
    product.imageUrl2,
    product.imageUrl3,
    product.imageUrl4,
    product.imageUrl5,
  ]

  let images = unfilteredImgs.filter((image) => image)

  const carouselTranslations = {
    image: t('image'),
    of: t('of'),
    updateImage: {
      title: t('updateImage.title'),
      description: t('updateImage.description'),
      submit: t('updateImage.submit'),
      close: t('updateImage.close'),
    },
  }
  const backButtonHref = isOwner ? `/myshop` : '/browse'

  return (
    <>
      <div className="flex flex-col ">
        <div
          id="product-info-container"
          className="flex min-h-[calc(100vh-80px)] w-screen flex-col items-center gap-10 lg:flex-row lg:justify-around"
        >
          <ProductImageCarousel
            translations={carouselTranslations}
            images={images}
            className="h-[50vh] lg:h-[60vh]"
            sellerId={product.sellerId}
          />
          <ProductInfoCard productInfo={product} isOwner={isOwner} />
        </div>
        <Link href={backButtonHref} className="w-2">
          <Button
            variant="outline"
            className={
              isOwner
                ? 'xl:left-18 ml-12 mt-4 lg:absolute lg:top-32 xl:left-12  xl:top-36 2xl:left-24 2xl:top-36'
                : 'fixed left-8 top-24 font-semibold md:left-14 lg:left-8 lg:top-36 xl:left-24 2xl:left-28 2xl:top-40'
            }
          >
            ⏎
          </Button>
        </Link>
        {!isOwner && (
          <Link href={`/myshop/${product.sellerId}`}>
            <Button
              variant="outline"
              className={
                'fixed right-8 top-24 font-semibold md:right-14 lg:right-8 lg:top-36 xl:right-24 2xl:right-28 2xl:top-40'
              }
            >
              {t('viewShop')}
            </Button>
          </Link>
        )}
      </div>
    </>
  )
}
