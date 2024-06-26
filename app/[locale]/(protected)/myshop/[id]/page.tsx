import { getProductsOwned } from '@/lib/product-actions'
import { CardWithImage } from '@/components/ui/cardWithImage'
import {
  getBannerById,
  getShopTextColorById,
  getShopTextFontById,
  getShopNameById,
  getUserById,
} from '@/lib/user-actions'
import Image from 'next/image'

// Some user shop
export default async function Page({ params }: { params: { id: string } }) {
  const owner = await getUserById(params.id)
  const products = await getProductsOwned(params.id)
  const banner = (await getBannerById(params.id)) ?? '/images/Banner/white.jpg'
  const title = await getShopNameById(params.id)
  const textColor = (await getShopTextColorById(params.id)) ?? 'rgb(0 0 0)'
  const textFont = (await getShopTextFontById(params.id)) ?? 'Montserrat'

  return (
    <>
      <div className="relative h-52 w-full rounded-b-lg bg-cover bg-center shadow-lg">
        {banner ? (
          <Image
            src={banner}
            alt="Product Image"
            style={{ objectFit: 'cover' }}
            width={1800}
            height={150}
            className="h-full w-full rounded-b-lg"
          />
        ) : null}
        <div className="absolute bottom-2 left-24 h-8 ">
          <h1
            className=" text-3xl font-bold drop-shadow-xl"
            style={{ color: textColor, fontFamily: textFont }}
          >
            {title || `${owner?.name}'s Shop`}
          </h1>
        </div>
      </div>
      <div
        className={`flex h-full flex-col items-center justify-center px-4 py-20 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
      >
        <div className="-mx-2 flex flex-wrap justify-around overflow-y-hidden">
          {products?.map((p, index) => (
            // <AnimatedCard  delay={0.3} >
            <CardWithImage
              key={`pr-${index}`}
              className="mx-[5px] my-[0.5rem]"
              product={products[index]}
              editable={false}
            />
            // </AnimatedCard>
          ))}
        </div>
      </div>
    </>
  )
}
