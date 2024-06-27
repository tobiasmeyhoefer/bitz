'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ChooseBanner from './choose-banner'
import { getBanner } from '@/lib/user-actions'
import { ShopText } from './shop-text'

const Banner = ({ title }: { title: string }) => {
  const [banner, setBanner] = useState('/images/Banner/default.png')

  useEffect(() => {
    const fetchBanner = async () => {
      const ban = await getBanner()
      if (ban) {
        setBanner(ban)
      }
    }
    fetchBanner()
  }, [])

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
          className="h-full w-full"
        />
        <ShopText title={title} />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ChooseBanner setBanner={setBanner} label={'change Banner'} />
        </div>
      </div>
    </>
  )
}

export default Banner
