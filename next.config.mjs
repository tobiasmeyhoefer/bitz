import createNextIntlPlugin from 'next-intl/plugin'
import withPlaiceholder from "@plaiceholder/next";

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   ppr: 'true',
  // },
  images: {
    remotePatterns: [
      {
        hostname: 'bhtbitzbucket.s3.eu-central-1.amazonaws.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
}

export default withPlaiceholder(withNextIntl(nextConfig))
