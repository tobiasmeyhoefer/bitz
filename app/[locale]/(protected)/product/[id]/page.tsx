import { Button } from '@/components/ui/button'
import { createConversation } from '@/lib/conversations-actions'
import { revalidatePath } from 'next/cache'
import { ProductImageCarousel } from '../productImgCarousel'
import ProductInfoCard from '../productInfoCard'
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

  return (
    <>
      <div
        id="product-info-container"
        className="flex min-h-[calc(100vh-80px)] w-screen flex-col items-center  lg:flex-row lg:justify-around"
      >
        <ProductImageCarousel
          translations={carouselTranslations}
          images={images}
          className="h-[50vh] lg:h-[60vh]"
          sellerId={product.sellerId}
        />
        <ProductInfoCard productInfo={product} />
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
