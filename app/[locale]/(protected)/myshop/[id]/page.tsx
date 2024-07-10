import {
  getBannerById,
  getShopTextColorById,
  getShopTextFontById,
  getShopNameById,
  getUserById,
} from '@/lib/user-actions'
import Image from 'next/image'
import ShopContent from '@/components/myShop/shopContent'
import { getTranslations } from 'next-intl/server'

export default async function Page({ params }: { params: { id: string } }) {
  const t = await getTranslations('Browse')
  const sortTranslations = {
    sortBy: t('sortby'),
    date: t('date'),
    price: t('price'),
  }
  const owner = await getUserById(params.id)
  const banner = await getBannerById(params.id)
  const title = await getShopNameById(params.id)
  const textColor = await getShopTextColorById(params.id)
  const textFont = await getShopTextFontById(params.id)
  return (
    <>
      <div className="group relative h-40 w-full bg-cover">
        <div className="absolute h-3/5 w-full bg-gradient-to-b from-black/40 to-black/0"></div>
        {banner && (
          <Image
            src={banner}
            alt="Product Image"
            style={{ objectFit: 'cover' }}
            width={1800}
            height={150}
            className="h-full w-full rounded-b-lg"
          />
        )}

        <div className="absolute bottom-2 left-24 h-8 ">
          <h1
            className="z-40 w-auto border-none text-xl font-bold md:text-3xl"
            style={{
              color: textColor,
              fontFamily: textFont,
              textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)',
            }}
          >
            {title || `${owner?.name}'s Shop`}
          </h1>
        </div>
      </div>
      <div className="absolute right-1/2 mt-4 translate-x-1/2"></div>
      <ShopContent id={params.id} translation={sortTranslations} />
    </>
  )
}
