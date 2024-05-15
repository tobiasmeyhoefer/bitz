"use client"
import { useEffect, useRef, useState } from 'react'
import {
  Shop,
  RevealOnScrollProps,
} from '@/lib/types'
import { CardWithImage } from '@/components/ui/card'
import { getFavorites } from '@/lib/productaction'
import { ProductType } from '@/lib/types'

const FavoriteContent = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([]);
  let isProduct = (item: any) => item.price !== undefined

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await getFavorites();
        if(result) {
          // weil einige werte nicht notNull sind und dann fehler kommen weil sie null  ein könnten
          const checkedResults: ProductType[] = result.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description ?? '',
            price: item.price,
            quantity: item.quantity,
            sellerId: item.sellerId,
            createdAt: item.createdAt,
            image: "/test_img.jpg",
          }));
          setProducts(checkedResults);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    };
    getProducts();
  }, []);
  console.log("-----" + products)

  return (
    <div
      className={`${loading && `h-full`} flex w-full flex-col items-center justify-center px-10 py-20 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      {!loading ? (
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products.map((p, index) => (
            <RevealOnScroll key={`prx-${index}`}>
              <CardWithImage
                key={`pr-${index}`}
                title={p.title}
                desc={p.description!}
                imgUrl1={p.imageUrl1}
                previewType={isProduct(p) ? 'product' : 'shop'}
                className="mx-[5px] my-[0.5rem]"
                productId={p.id}
              />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="h-20 w-20 animate-ping rounded-[30px] bg-black"></div>
        </div>
      )}
    </div>
  )
}

const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        scrollObserver.unobserve(entry.target)
      }
    })

    scrollObserver.observe(ref.current!)

    return () => {
      // if (ref.current) {
      //   scrollObserver.unobserve(ref.current)
      // }
    }
  }, [])

  const classes = `transition-opacity duration-1000
      ${isVisible ? 'opacity-100' : 'opacity-0'}`

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
}

export default FavoriteContent