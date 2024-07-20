/**
 * Renders the product page for a specific product.
 *
 * @param params - An object containing the `id` parameter from the URL.
 * @returns A React component that displays the product information, including the product image carousel and product info card.
 */
import { Button } from '@/components/ui/button'
import { ProductImageCarousel } from '@/components/products/product-img-carousel'
import ProductInfoCard from '@/components/products/product-info-card'
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
  const backButtonHref = isOwner ? `/my-shop` : '/browse'

  return (
    <>
      <div className="mb-16 flex flex-col justify-between px-4 sm:px-10 md:mb-0 md:px-[20px] lg:px-[30px] xl:px-[80px]">
        <div className="flex w-full justify-between">
          <Link href={backButtonHref} className="w-2">
            <Button variant="outline" className={isOwner ? 'mt-[1vh]' : 'mt-[1vh] font-semibold'}>
              ⏎
            </Button>
          </Link>
          {!isOwner && (
            <Link href={`/my-shop/${product.sellerId}`}>
              <Button variant="outline" className={'mt-[1vh]'}>
                {t('viewShop')}
              </Button>
            </Link>
          )}
        </div>
        <div
          id="product-info-container"
          className="mb-16 mt-2 flex flex-col items-center md:mb-0 md:mt-[2vh] lg:flex-row lg:items-start lg:justify-between lg:gap-6 "
        >
          <ProductImageCarousel
            translations={carouselTranslations}
            images={images}
            className=""
            sellerId={product.sellerId}
          />
          <ProductInfoCard productInfo={product} isOwner={isOwner} />
        </div>
      </div>
    </>
  )
}
