'use client'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import {
  BrowseContentProps,
  SearchBarProps,
  Product,
  Shop,
  RevealOnScrollProps,
} from '@/lib/types'
import { CardWithImage } from '../ui/card'
import { SlClose } from 'react-icons/sl'
import { Button } from '@/components/ui/button'
import { getProductsBrowse } from '@/lib/productaction'
import { FullProductType } from '@/lib/types'

const BrowseContent = (props: BrowseContentProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<FullProductType[] | Shop[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await getProductsBrowse();
        if(result) {
          // weil einige werte nicht notNull sind und dann fehler kommen weil sie null  ein könnten
          const checkedResults: FullProductType[] = result.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description ?? '',
            price: item.price,
            currency: item.currency,
            quantity: item.quantity,
            location: item.location ?? '',
            status: item.status,
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

  const suggestions = ['Receiver', 'Monitor', 'Audio', 'Laptop', 'Headphone']
  let isProduct = (item: any) => item.price !== undefined
  // ---Mock data---
  // let products: (Product | Shop)[] = []

  // for (let i = 0; i < 20; i++) {
  //   products.push({
  //     title: `Title ${i}`,
  //     description: `Description ${i}`,
  //     price: i,
  //     currency: `Currency ${i}`,
  //     quantity: i,
  //     location: `Location ${i}`,
  //     status: `Status ${i}`,
  //     image: '/test_img.jpg',
  //   })
  // }

  // products[5] = {
  //   title: 'Shop1',
  //   description: 'ShopDesc1',
  //   image: ['/test_img.jpg', '/test_img.jpg', '/test_img.jpg'],
  // }
  // products[9] = {
  //   title: 'Shop2',
  //   description: 'ShopDesc2',
  //   image: ['/test_img.jpg', '/test_img.jpg', '/test_img.jpg'],
  // }
  // products[10] = {
  //   title: 'Shop3',
  //   description: 'ShopDesc3',
  //   image: ['/test_img.jpg', '/test_img.jpg', '/test_img.jpg'],
  // }
  // products[11] = {
  //   title: 'Shop4',
  //   description: 'ShopDesc4',
  //   image: ['/test_img.jpg', '/test_img.jpg', '/test_img.jpg'],
  // }

  return (
    <div
      className={`${loading && `h-full`} flex w-full flex-col items-center justify-center px-10 py-20 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      <SearchDialog
        placeholder={
          searchValue.length > 0
            ? searchValue
            : props.searchTranslations.searchPlaceholder
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
                desc={p.description}
                imgUrl={p.image && p.image}
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

const SearchDialog = (props: SearchBarProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Input
          className="sticky top-[20px] h-14 w-full bg-white sm:w-2/3 md:w-1/2"
          type="search"
          placeholder={
            props.searchValue ? props.searchValue : props.placeholder
          }
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
            <h1 className="px-4 pt-2 text-lg font-medium">
              {props.suggestionsTitle}
            </h1>
            {props.suggestions.map((suggestion, index) => (
              <div
                onClick={() => {
                  setOpen(false)
                  props.setSearchValue(suggestion)
                }}
                className="rounded- px-8 py-2 hover:rounded-b-lg hover:bg-gray-100"
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
      if (ref.current) {
        scrollObserver.unobserve(ref.current)
      }
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

export default BrowseContent
