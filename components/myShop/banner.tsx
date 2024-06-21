'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import ChooseBanner from './choose-banner'
import { MdOutlineEdit } from 'react-icons/md'
import { ChangeFont } from './change-font'
const Banner = ({ title }: { title: string }) => {
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
          <h1 className="group absolute bottom-2 left-1/2 -translate-x-1/2 font-montserrat text-3xl font-bold drop-shadow-xl">
            {title}
          </h1>
          <div className="absolute bottom-2 right-2 z-30 h-8 w-24 text-xs">
            <ChooseBanner setBanner={setBanner} setIsBanner={setIsBanner} label={'change Banner'} />
          </div>
        </div>
      ) : (
        <div className="mt-2 flex h-12 w-full flex-col items-center justify-start gap-4 rounded-b-lg">
          <ChooseBanner setBanner={setBanner} setIsBanner={setIsBanner} label={'add Banner'} />
          <h1 className="group bottom-2 font-montserrat text-3xl font-bold drop-shadow-xl">
            {title}
            <ChangeFont />
          </h1>
        </div>
      )}
    </>
  )
}

export default Banner
