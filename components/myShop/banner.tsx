'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ChooseBanner from './choose-banner'
import { getBanner } from '@/lib/user-actions'
import { ShopText } from './shop-text'

const Banner = ({ title }: { title: string }) => {
  const [banner, setBanner] = useState('/images/Banner/white.jpg')
  // const [isBanner, setIsBanner] = useState(false)

  useEffect(() => {
    const fetchBanner = async () => {
      const ban = await getBanner()
      if (ban) {
        setBanner(ban)
        // setIsBanner(true)
      }
    }
    fetchBanner()
  }, [])

  return (
    <>
      <div className="group relative h-52 w-full rounded-b-lg bg-cover bg-center shadow-lg">
        <Image
          src={banner}
          alt="Product Image"
          style={{ objectFit: 'cover' }}
          width={1800}
          height={150}
          className="h-full w-full rounded-b-lg"
        />
        <ShopText title={title} />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ChooseBanner setBanner={setBanner} label={'change Banner'} />
        </div>
      </div>
      {/*       
        <div className="mt-2 flex h-12 w-full flex-col items-center justify-start gap-4 rounded-b-lg">
          <ChooseBanner setBanner={setBanner} setIsBanner={setIsBanner} label={'add Banner'} />

          <ShopText title={title} isBanner={isBanner} />
        </div> */}
    </>
  )
}

export default Banner
