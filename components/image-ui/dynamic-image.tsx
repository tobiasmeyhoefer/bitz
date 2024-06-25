'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getImage } from '@/lib/product-actions'
import { useEffect, useState } from 'react'

export default function DynamicImage({
  url,
  width,
  containerClass,
}: {
  url: string
  width: number
  containerClass?: string
}) {
  const [img, setImg] = useState<{ src: string; height: number; width: number }>()
  const [base64, setBase64] = useState<string>('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getImage(url)
        if (result && result.base64 && result.img) {
          setBase64(result.base64)
          setImg(result.img)
        } else {
          console.error('Invalid result from getImage', result)
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }
    fetch()
  }, [url])

  return (
    <div className={cn('relative')}>
      {img ? (
        <Image
          {...img}
          className={containerClass}
          alt="Preview Image Article"
          width={width}
          height={width}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQUlEQVR4nAE2Acn+AJpRFatjJa5lJv+5Sf/OUP/HTf/ES//CSf+7R/+vQQCPSg+nXyClXyH/q0D/yEv/wEf/vEX/t0P/rz//pjoAeDgAn1YXnlge9qNC/8VT/71S/7tX/rRb9rBf7q1gALmro829rdPGueTXxu3i0t7b1NLW0srS0sjR0sLL0QCmrbKNkJuKkJiGiZB7f4mBhY52f4hxdn+7xMbi5+AAXFthMDZGOD1MU1Nfx6qjT1RgQUpYKjVGjIuK//TCACEeIgAHGQwUHxgbJEMsKw0THAIMFwAAAHJ5fvrWtQBQQzkCBwwPFBkZICYcKzIzP0M+Sk5jcHPO3t7d6+8A3eXmu9DXvNXaw9/izObp0u7x1/T56f//4/L06fT0AOfy9OP1+OX4+uj4++7+/+j3+uj29+/+/+z5++/+//77sSREb6LPAAAAAElFTkSuQmCC"
          style={{ objectFit: 'cover', height: '300px' }}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  )
}
