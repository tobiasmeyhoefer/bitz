'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ChooseBanner from './choose-banner'

const Banner = () => {
  const [banner, setBanner] = useState<StaticImageData>()
  const [isBanner, setIsBanner] = useState(false)

  return (
    <>
      {isBanner ? (
        <div className="relative h-52 w-full rounded-b-lg bg-cover bg-center">
          <Image
            src={banner!}
            alt="Product Image"
            style={{ objectFit: 'cover' }}
            className="h-full w-full rounded-b-lg"
          />

          <div className="absolute bottom-2 right-2 z-30 h-8 w-24 text-xs">
            <ChooseBanner setBanner={setBanner} setIsBanner={setIsBanner} label={'change Banner'} />
          </div>
        </div>
      ) : (
        <div className="flex h-12 w-full items-end justify-center rounded-b-lg">
          <ChooseBanner setBanner={setBanner} setIsBanner={setIsBanner} label={'add Banner'} />
        </div>
      )}
    </>
  )
}

export default Banner
