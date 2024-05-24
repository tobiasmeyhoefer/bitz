'use client'

import { useEffect, useState } from 'react'
import { CardWithImage } from '@/components/ui/cardWithImage'
import { getProductsOwned } from '@/lib/productaction'
import { ProductType, MyShopProps } from '@/lib/types'

const MyShopContent = (props: MyShopProps) => {
  //const [loading] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await getProductsOwned(props.userId)
        if (result) {
          const checkedResults: ProductType[] = result.map((item) => ({
            title: item.title,
            description: item.description ?? '',
            price: item.price,
            quantity: item.quantity,
            sellerId: item.sellerId,
            createdAt: item.createdAt,
            imageUrl1: item.imageUrl1,
            imageUrl2: item.imageUrl2,
            imageUrl3: item.imageUrl3,
            imageUrl4: item.imageUrl4,
            imageUrl5: item.imageUrl5
          }))
          setProducts(checkedResults)
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error)
      }
    }

    getProducts()
  }, [])

  let isProduct = (item: any) => item.price !== undefined

  return (
    <div className={`h-full flex flex-col items-center justify-center px-4 py-20 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}>
      { (
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products.map((p, index) => (
              <CardWithImage
                key={`pr-${index}`}
                title={p.title}
                desc={p.description}
                imgUrl1={p.imageUrl1}
                className="mx-[5px] my-[0.5rem]"
                productID={p.id}
                product={products[index]}
                favIcon
              />
          ))}
        </div>
      ) }
    </div>
  )
}

export default MyShopContent
