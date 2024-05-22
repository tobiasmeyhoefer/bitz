import { ProductType } from '@/lib/types'
import { ProductImageCarousel } from '../productImgCarousel'
import ProductInfoCard from '../productInfoCard'
import { useTranslations } from 'next-intl'

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { p: string }
}) {
  const t = useTranslations('Product')
  const userId = atob(params.id)

  const product: ProductType = JSON.parse(atob(searchParams.p))
  const ownsProduct = '12345' === product.sellerId

  const unfilteredImgs = [
    product.imageUrl1,
    product.imageUrl2,
    product.imageUrl3,
    product.imageUrl4,
    product.imageUrl5,
  ]

  let images = unfilteredImgs.filter((image) => image)
  //let images = ['/test_img.jpg', '/test_img.jpg', '/test_img.jpg']

  const carouselTranslations = {
    image: t('image'),
    of: t('of'),
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-screen flex-col items-center lg:flex-row lg:justify-around">
      <ProductImageCarousel
        translations={carouselTranslations}
        images={images}
        className="h-[50vh] lg:h-[60vh]"
        ownsProduct={ownsProduct}
      />
      <ProductInfoCard product={product} ownsProduct={'1234'} />
    </div>
  )
}
