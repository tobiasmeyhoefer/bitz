'use client'

import { getProductsOwned } from '@/lib/product-actions'
import { ProductType } from '@/schema'
import { useEffect, useState } from 'react'
import { CardWithImage } from '../ui/cardWithImage'
import { SortProducts } from '../sort-products/sort-products'
import { SortProductsProps } from '@/lib/types'

const ShopContent = (params: { id: string; translation: SortProductsProps }) => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProductsOwned(params.id)
      setProducts(fetchedProducts)
    }
    fetchProducts()
  }, [params.id])

  return (
    <div
      className={` flex h-full flex-col items-center justify-center px-4 py-10 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      <SortProducts
        userId={params.id}
        setProducts={setProducts}
        translations={params.translation}
      />
      <div className="-mx-2 mt-6 flex flex-wrap justify-around overflow-y-hidden">
        {products?.map((p, index) => (
          // <AnimatedCard  delay={0.3} >
          <CardWithImage
            key={`pr-${index}`}
            className="mx-[5px] my-[0.5rem]"
            product={products[index]}
            editable={false}
          />
          // </AnimatedCard>
        ))}
      </div>
    </div>
  )
}

export default ShopContent
