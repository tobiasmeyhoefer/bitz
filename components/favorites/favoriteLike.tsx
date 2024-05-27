'use client'
import { addToFavorites, checkFavorite, deleteFavorite } from '@/lib/productaction'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Button } from '../ui/button'

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
          {isFavorite ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
        </Button>
      </form>
    </>
  )
}

export default FavoriteLike
