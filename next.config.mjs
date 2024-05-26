import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'bhtbitzbucket.s3.eu-central-1.amazonaws.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
