/**
 * Renders the page for a specific shop, fetching and displaying the shop's banner, name, owner, and other details.
 *
 * @param params - An object containing the `id` parameter from the URL path.
 * @returns A React component that renders the shop page.
 */
import {
  getBannerById,
  getShopTextColorById,
  getShopTextFontById,
  getShopNameById,
  getUserById,
} from '@/lib/user-actions'
import Image from 'next/image'
import ShopContent from '@/components/my-shop/shop-content'
import { getTranslations } from 'next-intl/server'

export default async function Page({ params }: { params: { id: string } }) {
  const t = await getTranslations('Browse')
  const tshop = await getTranslations('MyShop')

  const sortTranslations = {
    sortBy: t('sortby'),
    date: t('date'),
    price: t('price'),
  }
  const ownerProm = getUserById(params.id)
  const bannerProm = getBannerById(params.id)
  const titleProm = getShopNameById(params.id)
  const textFontProm = getShopTextFontById(params.id)

  const [owner, banner, title, textFont] = await Promise.all([
    ownerProm,
    bannerProm,
    titleProm,
    textFontProm,
  ])

  return (
    <>
      <div className="inset-x-1/2 flex flex-col items-center">
        <div className="group relative h-40 w-screen bg-cover">
          <div className="absolute h-3/5 w-full bg-gradient-to-b from-black/40 to-black/0"></div>
          {banner && (
            <Image
              src={banner}
              alt="Product Image"
              style={{ objectFit: 'cover' }}
              width={3800}
              height={150}
              className="h-full w-full "
            />
          )}

          <div className="absolute bottom-2 left-24 h-8 ">
            <h1
              className="z-40 w-auto border-none text-xl font-bold text-white md:text-3xl"
              style={{
                fontFamily: textFont,
                textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)',
              }}
            >
              {title || `${owner?.name}'s Shop`}
            </h1>
          </div>
        </div>
        <ShopContent
          viewTranslation={tshop('viewShop')}
          id={params.id}
          translation={sortTranslations}
        />
      </div>
    </>
  )
}
