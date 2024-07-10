'use client'

import {
  getProductsBrowse,
  getProductsByCategory,
  searchProductsByTitle,
} from '@/lib/product-actions'
import { BrowseContentProps } from '@/lib/types'
import { useEffect, useState } from 'react'
import { CardWithImage } from '../ui/cardWithImage'
import { SortProducts } from '../sort-products/sort-products'
import { SearchDialog } from './search-dialog'
import OnboardingBrowseCard from '../onboarding/onboarding-browse-card'
import { ProductType } from '@/schema'
import AnimatedCard from '../ui/animated-card'
import { FilterProducts } from '../filter-products/filter-products'
import { getUser } from '@/lib/user-actions'
import { Button } from '../ui/button'
import AnimatedButton from '../ui/animated-button'
import AddressChooserPopup from '../adressChooser-popup/adressChooser-popup'

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
  const [loading, setLoading] = useState(true) //
  const [noSearchResults, setNoSearchResults] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [userId, setUserId] = useState<string>(``)
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreProducts, setHasMoreProducts] = useState(true)
  const [addressChoosen, setAddressChoosen] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser()
      setUserId(user.id)
      const result = await getProductsBrowse(10, 0)
      setProducts(result)
      if (!user.adress) {
        setAddressChoosen(false)
      }
      if (result.length === 0) {
        setNoSearchResults(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const loadMoreProducts = async () => {
    setIsLoadingMore(true);
    const result = await getProductsBrowse(10, page * 10);
    if (result.length < 4) { // Wert muss angepasst werden, je nach dem wie viele Produkte man mehr Laden moechte 
      setHasMoreProducts(false);
    }

    setProducts((prevProducts) => [...prevProducts, ...result])
    if (result.length === 0) {
      setNoSearchResults(true)
    } else {
      setNoSearchResults(false)
    }
    setPage((prevPage) => prevPage + 1)
    setIsLoadingMore(false)
  }

  const loadProductsByCategory = async (category: string) => {
    setLoading(true)
    const result = await getProductsByCategory(category, userId)
    setProducts(result)
    if (result.length === 0) {
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
      result = await searchProductsByTitle(title, userId)
    }

    setProducts(result)
    if (result.length === 0) {
      setNoSearchResults(true)
    } else {
      setNoSearchResults(false)
    }
    setLoading(false)
  }

  return (
    <>
      {!addressChoosen ? (
        <AddressChooserPopup translations={props.addressChooserTranslations} />
      ) : (
        <></>
      )}
      {/* <OnboardingBrowseCard /> */}
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
            userId={userId}
          />
          <SortProducts setProducts={setProducts} translations={props.sortTranslations} />
          <FilterProducts setProducts={setProducts} />
        </div>
        {!loading ? (
          <>
            <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
              {products.map((p, index) => (
                <div key={`kp-${index}`}>
                  <AnimatedCard delay={0.3}>
                    <CardWithImage
                      key={`pr-${index}`}
                      className={`mx-[5px] my-[0.5rem]`} // h-[400px] w-[200px]
                      product={products[index]}
                      favIcon
                      editable={false}
                    />
                  </AnimatedCard>
                </div>
              ))}
              {noSearchResults && <div className=" px-4">Keine Suchergebnisse gefunden</div>}
            </div>
            {hasMoreProducts && (
              <Button onClick={loadMoreProducts} disabled={isLoadingMore} variant='default' className='mt-4 mb-6'>
              {isLoadingMore ? 'Loading...' : 'Load More'}
              </Button>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="h-20 w-20 animate-ping rounded-[30px] bg-black"></div>
          </div>
        )}
      </div>
    </>
  )
}

export default BrowseContent
