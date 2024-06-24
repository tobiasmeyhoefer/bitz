'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ChooseBanner from './choose-banner'
import { getBanner } from '@/lib/user-actions'
import { ShopText } from './shop-text'

const Banner = ({ title }: { title: string }) => {
  const [banner, setBanner] = useState('')
  const [isBanner, setIsBanner] = useState(false)

  useEffect(() => {
    const fetchBanner = async () => {
      const ban = await getBanner()
      if (ban) {
        setBanner(ban)
        setIsBanner(true)
      }
    }
    fetchBanner()
  }, [])

  return (
    <>
      {isBanner ? (
        <div className="relative h-52 w-full rounded-b-lg bg-cover bg-center">
          <Image
            src={banner!}
            alt="Product Image"
            style={{ objectFit: 'cover' }}
            width={1800}
            height={150}
            className="h-full w-full rounded-b-lg"
          />
          {/* <h1 className="group absolute bottom-2 left-1/2 -translate-x-1/2 font-montserrat text-3xl font-bold drop-shadow-xl">
            {title}
          </h1> */}
          <ShopText title={title} isBanner={isBanner} />
          <div className="absolute bottom-2 right-2 z-30 h-8 w-24 text-xs">
            <ChooseBanner setBanner={setBanner} setIsBanner={setIsBanner} label={'change Banner'} />
          </div>
        </div>
      ) : (
        <div className="mt-2 flex h-12 w-full flex-col items-center justify-start gap-4 rounded-b-lg">
          <ChooseBanner setBanner={setBanner} setIsBanner={setIsBanner} label={'add Banner'} />

          <ShopText title={title} isBanner={isBanner} />
        </div>
      )}
    </>
  )
}

export default Banner
