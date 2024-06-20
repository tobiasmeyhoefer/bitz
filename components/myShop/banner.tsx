'use client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'

const Banner = ({ bannerUrl }: { bannerUrl: StaticImageData }) => {
  return (
    <div
      className="h-52 w-full rounded-b-lg bg-cover bg-center"
      style={{ backgroundImage: '/images/test_banner.jpg' }}
      onMouseEnter={() => console.log('GFTVHIUHZGJ')}
    >
      <Image
        src={bannerUrl}
        alt="Product Image"
        style={{ objectFit: 'cover' }}
        className="h-full w-full rounded-b-lg"
      />
      {/* Optional: weitere Inhalte des Banners */}
    </div>
  )
}

export default Banner
