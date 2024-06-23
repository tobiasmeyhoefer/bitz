import Image from 'next/image'
import { cn, getImage } from '@/lib/utils'

export default async function DynamicImage({
  url,
  width,
  containerClass,
}: {
  url: string
  width: number
  containerClass?: string
}) {
  const { base64, img } = await getImage(url)

  return (
    <div className={cn('relative')}>
      <Image
        {...img}
        className={containerClass}
        alt="Preview Image Article"
        width={width}
        placeholder="blur"
        blurDataURL={base64}
        style={{ objectFit: 'cover', height: '300px' }}
      />
    </div>
  )
}
