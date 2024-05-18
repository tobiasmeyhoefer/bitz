'use client'
import { addToFavorites, checkFavorite, deleteFavorite } from '@/lib/productaction'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Like from '../svg/like'

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
          onClick={() => {
            isFavorite ? deleteFavorite(productId) : addToFavorites(productId)
            setIsFavorite(!isFavorite)
          }}
        >
          <Like className={isFavorite ? 'w-5 fill-red-600' : 'w-5 fill-black'} />
        </Button>
      </form>
    </>
  )
}

export default FavoriteLike
