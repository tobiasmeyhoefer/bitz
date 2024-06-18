import React from 'react'

interface BannerProps {
  customBannerUrl?: string
  defaultBannerUrl: string
}

const Banner: React.FC<BannerProps> = ({ customBannerUrl, defaultBannerUrl }) => {
  const bannerUrl = customBannerUrl || defaultBannerUrl

  return (
    <div
      className="h-32 w-full bg-cover bg-center"
      style={{ backgroundImage: './images/test_banner.jpg' }}
    >
      {/* Optional: weitere Inhalte des Banners */}
    </div>
  )
}

export default Banner
