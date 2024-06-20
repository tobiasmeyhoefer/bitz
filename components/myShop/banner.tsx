import React from 'react'

interface BannerProps {
  customBannerUrl?: string
  defaultBannerUrl: string
}

const Banner = ({ customBannerUrl, defaultBannerUrl }: BannerProps) => {
  const bannerUrl = customBannerUrl || defaultBannerUrl

  return (
    <div
      className="h-52 w-full bg-slate-500 bg-cover bg-center"
      style={{ backgroundImage: './images/test_banner.jpg' }}
    >
      {/* Optional: weitere Inhalte des Banners */}
    </div>
  )
}

export default Banner
