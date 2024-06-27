'use client'
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
import { useEffect, useState } from 'react'
import { ProductType, UserType } from '@/schema'
import { SortProducts } from '@/components/sort-products/sort-products'

// Some user shop
export default function Page({ params }: { params: { id: string } }) {
  const [owner, setOwner] = useState<UserType>()
  const [products, setProducts] = useState<ProductType[]>([])
  const [banner, setBanner] = useState('/images/Banner/default.png')
  const [title, setTitle] = useState('')
  const [textColor, setTextColor] = useState('rgb(0 0 0)')
  const [textFont, setTextFont] = useState('Montserrat')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerData = await getUserById(params.id)
        const productsData = await getProductsOwned(params.id)
        const bannerData = await getBannerById(params.id)
        const titleData = await getShopNameById(params.id)
        const textColorData = await getShopTextColorById(params.id)
        const textFontData = await getShopTextFontById(params.id)
        setOwner(ownerData)
        setProducts(productsData)
        setBanner(bannerData ?? '/images/Banner/default.png')
        setTitle(titleData)
        setTextColor(textColorData ?? 'rgb(0 0 0)')
        setTextFont(textFontData ?? 'Montserrat')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [params.id])

  return (
    <>
      <div className="group relative h-40 w-full  bg-cover">
        <div className="absolute h-3/5 w-full bg-gradient-to-b from-black/40 to-black/0"></div>
        <Image
          src={banner}
          alt="Product Image"
          style={{ objectFit: 'cover' }}
          width={1800}
          height={150}
          className="h-full w-full rounded-b-lg"
        />
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
      <div className="absolute right-1/2 mt-4 translate-x-1/2">
        <SortProducts
          setProducts={setProducts}
          translations={{
            sortBy: 'sortby',
            date: 'date',
            price: 'price',
          }}
        />
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
