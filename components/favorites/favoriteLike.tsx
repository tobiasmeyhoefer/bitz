'use client'
import { addToFavorites, checkFavorite, deleteFavorite } from '@/lib/productaction'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import filled from '@/public/icons/filledheart.svg'
import heart from '@/public/icons/heart.svg'
import Image from 'next/image'

const FavoriteLike = ({ productId }: { productId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    async function fetchFavorite() {
      const isFav = await checkFavorite(productId)
      setIsFavorite(isFav)
    }
    fetchFavorite()
  }, [productId])
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <Button
          variant="ghost"
          size="icon"
          type="submit"
          aria-label="like product"
          onClick={() => {
            isFavorite ? deleteFavorite(productId) : addToFavorites(productId)
            setIsFavorite(!isFavorite)
          }}
        >
          <Image
            width={30}
            height={30}
            src={isFavorite ? filled : heart}
            className={isFavorite ? '' : 'white-filter'}
            alt="LikeIcon"
          />
        </Button>
      </form>
    </>
  )
}

export default FavoriteLike
