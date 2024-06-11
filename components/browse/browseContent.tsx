'use client'
import {
  getProductsBrowse,
  getProductsByCategory,
  searchProductsByTitle,
} from '@/lib/productaction'
import { BrowseContentProps, ProductType } from '@/lib/types'
import { useEffect, useState } from 'react'
import { CardWithImage } from '../ui/cardWithImage'
import { SortProducts } from '../sort-products/sort-products'
import { SearchDialog } from './search-dialog'
const suggestions = [
  'Reciever',
  'Monitor',
  'Audio',
  'Laptop',
  'Headphone',
  'Smartphone',
  'Tablet',
  'Smartwatch',
  'Printer',
  'Camera',
  'Speaker',
  'Projector',
  'Game Console',
  'Drone',
  'Router',
  'Hard Drive',
  'SSD',
  'Keyboard',
  'Mouse',
  'Graphics Card',
  'Motherboard',
  'Power Supply',
  'RAM',
  'Cooling System',
  'VR Headset',
  'E-Reader',
  'Fitness Tracker',
  'Charger',
]

const BrowseContent = (props: BrowseContentProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [noSearchResults, setNoSearchResults] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const result = await getProductsBrowse()
      // weil einige werte nicht notNull sind und dann fehler kommen weil sie null  ein könnten
      const checkedResults: ProductType[] = result.map((item) => ({
        ...item,
        description: item.description ?? '',
        category: item.category ?? '',
        stripeId: item.stripeId ?? '',
        paymentLink: item.paymentLink ?? '',
        isDirectlyBuyable: item.isDirectlyBuyable ?? false,
        isSold: item.isSold ?? false,
      }))
      setProducts(checkedResults)
      if (checkedResults.length === 0) {
        setNoSearchResults(true)
      }
    }
    getProducts()
  }, [])

  const loadProductsByCategory = async (category: string) => {
    setLoading(true)
    const result = await getProductsByCategory(category)
    const checkedResults: ProductType[] = result.map((item) => ({
      ...item,
      description: item.description ?? '',
      category: item.category ?? '',
      stripeId: item.stripeId ?? '',
      paymentLink: item.paymentLink ?? '',
      isDirectlyBuyable: item.isDirectlyBuyable ?? false,
      isSold: item.isSold ?? false,
    }))
    setProducts(checkedResults)
    if (checkedResults.length === 0) {
      setNoSearchResults(true)
    } else {
      setNoSearchResults(false)
    }
    setLoading(false)
  }

  const loadProductsByTitle = async (title: string) => {
    setLoading(true)
    let result
    if (title === '') {
      result = await getProductsBrowse()
    } else {
      result = await searchProductsByTitle(title)
    }
    const checkedResults: ProductType[] = result!.map((item: any) => ({
      ...item,
      description: item.description ?? '',
      category: item.category ?? '',
    }))
    setProducts(checkedResults)
    if (checkedResults.length === 0) {
      setNoSearchResults(true)
    } else {
      setNoSearchResults(false)
    }
    setLoading(false)
  }

  return (
    <div
      className={`${loading && `h-full`} flex w-full flex-col items-center justify-center  px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
      <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row">
        <SearchDialog
          placeholder={
            searchValue.length > 0 ? searchValue : props.searchTranslations.searchPlaceholder
          }
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          suggestions={suggestions}
          suggestionsTitle={props.searchTranslations.suggestions}
          loadProductsByCategory={loadProductsByCategory}
          loadProductsByTitle={loadProductsByTitle}
        />
        <SortProducts setProducts={setProducts} translations={props.sortTranslations} />
      </div>
      {!loading ? (
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products.map((p, index) => (
            <div key={`kp-${index}`}>
              {/* <RevealOnScroll key={`prx-${index}`}> */}
              <CardWithImage
                key={`pr-${index}`}
                title={p.title}
                desc={p.description!}
                price={p.price}
                timestamp={p.createdAt}
                imgUrl1={p.imageUrl1}
                className="mx-[5px] my-[0.5rem]"
                productID={p.id}
                product={products[index]}
                favIcon
                editable={false}
              />
              {/* </RevealOnScroll> */}
            </div>
          ))}
          {noSearchResults && <div className=" px-4">Keine Suchergebnisse gefunden</div>}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="h-20 w-20 animate-ping rounded-[30px] bg-black"></div>
        </div>
      )}
    </div>
  )
}

export default BrowseContent
