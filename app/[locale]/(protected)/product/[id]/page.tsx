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
  // const userId = atob(params.id)

  const productInfo: any = JSON.parse(atob(searchParams.p))

  const unfilteredImgs = [
    productInfo.imageUrl1,
    productInfo.imageUrl2,
    productInfo.imageUrl3,
    productInfo.imageUrl4,
    productInfo.imageUrl5,
  ]

  let images = unfilteredImgs.filter((image) => image)
  //let images = ['/test_img.jpg', '/test_img.jpg', '/test_img.jpg']

  const carouselTranslations = {
    image: t('image'),
    of: t('of'),
  }

  return (
    <div
      id="product-info-container"
      className="flex min-h-[calc(100vh-80px)] w-screen flex-col items-center lg:flex-row lg:justify-around"
    >
      <ProductImageCarousel
        translations={carouselTranslations}
        images={images}
        className="h-[50vh] lg:h-[60vh]"
      />
      <ProductInfoCard productInfo={productInfo} />
    </div>
  )
}
