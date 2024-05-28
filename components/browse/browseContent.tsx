'use client'
import { useEffect, useState } from 'react'
import { ProductType } from '@/lib/types'
import { CardWithImage } from '../ui/cardWithImage'
import { getProductsBrowse } from '@/lib/productaction'

const BrowseContent = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await getProductsBrowse()
        if (result) {
          // weil einige werte nicht notNull sind und dann fehler kommen weil sie null  ein könnten
          const checkedResults: ProductType[] = result.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description ?? '',
            price: item.price,
            quantity: item.quantity,
            category: item.category ?? '',
            sellerId: item.sellerId,
            createdAt: item.createdAt,
            imageUrl1: item.imageUrl1,
            imageUrl2: item.imageUrl2,
            imageUrl3: item.imageUrl3,
            imageUrl4: item.imageUrl4,
            imageUrl5: item.imageUrl5,
          }))
          setProducts(checkedResults)
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error)
      }
    }
    getProducts()
  }, [])

  return (
    <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
      {products.map((p, index) => (
        <div key={`kp-${index}`}>
          <CardWithImage
            key={`pr-${index}`}
            title={p.title}
            desc={p.description!}
            imgUrl1={p.imageUrl1}
            className="mx-[5px] my-[0.5rem]"
            productID={p.id}
            product={products[index]}
            favIcon
            editable={false}
          />
        </div>
      ))}
    </div>
  )
}

export default BrowseContent
