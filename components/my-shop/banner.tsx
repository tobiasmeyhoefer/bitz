/**
 * Renders a banner component with a title and an optional custom banner image.
 *
 * @param title - The title to display in the banner.
 * @param myBanner - An optional URL for a custom banner image. If not provided, the default banner image will be used.
 * @returns A React component that renders the banner.
 */
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ChooseBanner from './choose-banner'
import { getBanner } from '@/lib/user-actions'
import { ShopText } from './shop-text'

const Banner = ({ title, myBanner }: { title: string; myBanner: string }) => {
  const [banner, setBanner] = useState('')

  useEffect(() => {
    setBanner(myBanner ?? '/images/Banner/default.png')
  }, [myBanner])

  return (
    <>
      <div className="group absolute h-40 w-screen bg-cover">
        <div className="absolute h-3/5 w-full bg-gradient-to-b from-black/40 to-black/0"></div>
        <Image
          src={banner}
          alt="Product Image"
          style={{ objectFit: 'cover' }}
          width={3800}
          height={150}
          className="h-full w-full"
        />
        <ShopText title={title} />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ChooseBanner setBanner={setBanner} />
        </div>
      </div>
    </>
  )
}

export default Banner
