import { Button } from '@/components/ui/button'
import { createConversation } from '@/lib/conversations-actions'
import { revalidatePath } from 'next/cache'
import { ProductImageCarousel } from '../productImgCarousel'
import ProductInfoCard from '../productInfoCard'
import { useTranslations } from 'next-intl'
import { getUser } from '@/lib/useraction'
import { createCheckoutSession, productHasCheckoutSessionOpened } from '@/lib/stripe-actions'
import { redirect } from '@/navigation'
import { redirect as red } from 'next/navigation'

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

  // console.log(productInfo)

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
    <>
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
      <form
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
      </form>
      <form
        action={async () => {
          'use server'
          const openedCheckoutSession = await productHasCheckoutSessionOpened(productInfo.id)
          if(!openedCheckoutSession) {
            const user = await getUser()
            await createCheckoutSession(user![0].id, productInfo.id)
            revalidatePath('/transactions')
            console.log(productInfo.paymentUrl)
            red(productInfo.paymentUrl)
          }
        }}
      >
        <Button className="fixed bottom-6 right-6" type="submit">
          Direkt Kaufen
        </Button>
      </form>
    </>
  )
}
