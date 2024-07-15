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
      <div className="flex flex-col">
        <div
          id="product-info-container"
          className="mb-16 mt-[5vh] flex w-screen flex-col items-center px-4 sm:px-10 md:mb-0 md:px-[20px] lg:flex-row lg:items-start lg:justify-around lg:gap-10 lg:px-[30px] xl:px-[80px]"
        >
          <ProductImageCarousel
            translations={carouselTranslations}
            images={images}
            className=""
            sellerId={product.sellerId}
          />
          <ProductInfoCard productInfo={product} isOwner={isOwner} />
        </div>
        <Link href={backButtonHref} className="w-2">
          <Button
            variant="outline"
            className={
              isOwner
                ? 'fixed left-4 top-[80px] sm:left-10 md:left-[20px] lg:left-[30px] xl:left-[80px]'
                : 'fixed left-4 top-[80px] font-semibold sm:left-10 md:left-[20px] lg:left-[30px] xl:left-[80px]'
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
                'fixed right-4 top-[80px]  top-[80px] font-semibold sm:right-10 md:right-[20px] lg:right-[30px] xl:right-[80px] '
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
