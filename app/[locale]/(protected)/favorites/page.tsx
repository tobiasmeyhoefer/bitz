"use client"
import { useEffect, useRef, useState } from 'react'
import {
  Shop,
  RevealOnScrollProps,
} from '@/lib/types'
import { CardWithImage } from '@/components/ui/card'
import { getFavorites } from '@/lib/productaction'
import { FullProductType } from '@/lib/types'
import FavoriteContent from '@/components/favorites/favoriteContent'

const Favorites = () => {
  return (
    <div>
      <FavoriteContent/>
    </div>
  )
}

export default Favorites
