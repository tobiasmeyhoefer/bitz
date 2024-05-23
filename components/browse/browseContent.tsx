'use client'
import { Input } from '@/components/ui/input'
import { getProductsBrowse } from '@/lib/productaction'
import { BrowseContentProps, ProductType, SearchBarProps } from '@/lib/types'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SlClose } from 'react-icons/sl'
import { CardWithImage } from '../ui/cardWithImage'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const BrowseContent = (props: BrowseContentProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
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

  const suggestions = ['Receiver', 'Monitor', 'Audio', 'Laptop', 'Headphone']

  const imgArr = ['/test_img.jpg', '/test_img.jpg', '/test_img.jpg']
  return (
    <div
      className={`${loading && `h-full`} flex w-full flex-col items-center justify-center  px-4 py-20 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      <SearchDialog
        placeholder={
          searchValue.length > 0 ? searchValue : props.searchTranslations.searchPlaceholder
        }
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        suggestions={suggestions}
        suggestionsTitle={props.searchTranslations.suggestions}
      />
      {!loading ? (
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products.map((p, index) => (
            <RevealOnScroll key={`prx-${index}`}>
              <CardWithImage
                key={`pr-${index}`}
                title={p.title}
                desc={p.description!}
                imgUrl1={p.imageUrl1}
                className="mx-[5px] my-[0.5rem]"
                productID={p.id}
                product={products[index]}
                favIcon
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

const SearchDialog = (props: SearchBarProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Input
          className="sticky top-[20px] h-14 w-full bg-white sm:w-2/3 md:w-1/2"
          type="search"
          placeholder={props.searchValue ? props.searchValue : props.placeholder}
          readOnly
        />
      </DialogTrigger>
      <DialogContent className="gap-0 border-0 bg-white p-0">
        <div className="flex">
          <Input
            className="rounded-t-l m-0 h-14 rounded-b-none px-4"
            type="input"
            placeholder={props.placeholder}
            onChange={(e) => props.setSearchValue(e.target.value)}
            value={props.searchValue ? props.searchValue : ''}
            onKeyDown={(e) => e.key === 'Enter' && setOpen(false)} // Data fetching trigger
          />
          {props.searchValue.length > 0 && (
            <SlClose
              onClick={() => props.setSearchValue('')}
              className="absolute right-[20px] top-[20%] h-[20px] w-[20px]"
            />
          )}
        </div>
        {!props.searchValue ? (
          <>
            <h1 className="px-4 pt-2 text-lg font-medium text-black">{props.suggestionsTitle}</h1>
            {props.suggestions.map((suggestion, index) => (
              <div
                onClick={() => {
                  setOpen(false)
                  props.setSearchValue(suggestion)
                }}
                className="rounded- px-8 py-2 text-black hover:rounded-b-lg hover:bg-gray-100"
                key={`s-${index}`}
              >
                {suggestion}
              </div>
            ))}
          </>
        ) : (
          <div className="px-4 py-2">{props.searchValue}</div>
        )}
      </DialogContent>
    </Dialog>
  )
}

const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const ref = useRef(null)

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        controls.start({ opacity: 1, y: 0 })
        scrollObserver.unobserve(entry.target)
      }
    })

    scrollObserver.observe(ref.current!)

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current)
      }
    }
  }, [controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

export default BrowseContent
