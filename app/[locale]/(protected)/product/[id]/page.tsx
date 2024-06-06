import { Button } from '@/components/ui/button'
import { ProductImageCarousel } from '../productImgCarousel'
import ProductInfoCard from '../productInfoCard'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import { getProductById } from '@/lib/productaction'

export default async function Page({ params }: { params: { id: string } }) {
  const t = await getTranslations('Product')
  const productId = params.id

  const fetchedProduct: any = await getProductById(productId)
  const product = fetchedProduct[0]

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
  const backButtonHref = product.isOwner ? `/myshop` : '/browse'

  return (
    <>
      <div className="flex flex-col ">
        <div
          id="product-info-container"
          className="flex min-h-[calc(100vh-80px)] w-screen flex-col items-center  lg:flex-row lg:justify-around"
        >
          <ProductImageCarousel
            translations={carouselTranslations}
            images={images}
            className="h-[50vh] lg:h-[60vh]"
            sellerId={productInfo.sellerId}
          />
          <ProductInfoCard productInfo={product} />
        </div>
        <Button
          variant="outline"
          className={
            productInfo.isOwner
              ? // ? 'fixed bottom-6 left-8 md:left-14 lg:left-8 lg:top-36 xl:left-24 2xl:left-28 2xl:top-40'
                '2xl:left-26 xl:left-18 l ml-12 mt-4 w-16 lg:absolute lg:top-36 xl:left-12  xl:top-36 2xl:left-24 2xl:top-36'
              : 'md: fixed bottom-6 left-8  md:left-14 lg:left-8 lg:top-36 xl:left-24 2xl:left-28 2xl:top-40'
          }
        >
          <Link href={backButtonHref}> ⏎ </Link>
        </Button>
      </div>
      {/* <form
        action={async () => {
          'use server'
          await createConversation(productInfo.id)
          revalidatePath('/conversations')
          redirect('/conversations')
        }}
      >
        <Button type="submit" className="fixed bottom-6 right-40">
          Kaufen
        </Button>
      </form> */}
    </>
  )
}
