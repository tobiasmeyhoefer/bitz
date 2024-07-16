/**
 * A React component that renders a like/favorite button for a product.
 *
 * The component checks if the product is already in the user's favorites, and
 * updates the button's appearance and functionality accordingly. Clicking the
 * button will add or remove the product from the user's favorites.
 *
 * @param {object} props - The component props.
 * @param {string} props.productId - The ID of the product.
 * @param {string} [props.className] - An optional CSS class name to apply to the button.
 * @returns {JSX.Element} - The rendered like/favorite button.
 */

'use client'
import { addToFavorites, checkFavorite, deleteFavorite } from '@/lib/product-actions'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const FavoriteLike = ({ productId, className }: { productId: string; className?: string }) => {
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
          className={cn('flex', className)}
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
