/**
 * The `BrowseContent` component is responsible for rendering the main content of the browse page. It fetches and displays products, allows searching and filtering, and provides pagination functionality.
 *
 * The component uses various helper functions and components to achieve its functionality, such as:
 * - `getProductsBrowse`, `getProductsByCategory`, and `searchProductsByTitle` to fetch products
 * - `CardWithImage`, `SortProducts`, `SearchDialog`, `FilterProducts`, and other UI components to render the content
 * - `useState` and `useEffect` hooks to manage the component's state and side effects
 *
 * The component also handles user interactions, such as searching for products, loading more products, and choosing an address. It updates the state accordingly and re-renders the content based on the changes.
 */
'use client'

import {
  getProductsBrowse,
  getProductsByCategory,
  searchProductsByTitle,
} from '@/lib/product-actions'
import { BrowseContentProps } from '@/lib/types'
import { useEffect, useState } from 'react'
import { CardWithImage } from '../ui/card-with-image'
import { SortProducts } from '../sort-products/sort-products'
import { SearchDialog } from './search-dialog'
import OnboardingBrowseCard from '../onboarding/onboarding-browse-card'
import { ProductType } from '@/schema'
import AnimatedCard from '../ui/animated-card'
import { FilterProducts } from '../filter-products/filter-products'
import { getUser } from '@/lib/user-actions'
import { Button } from '../ui/button'
import AddressChooserPopup from '../address-chooser-popup/address-chooser-popup'
import LoadingSkeletonBrowse from '../fallbacks/browse-fallback'

const suggestions = [
  'Audio',
  'Beamer',
  'Bluetooth Speaker',
  'Blu-ray Player',
  'Camera',
  'Charger',
  'Cooling System',
  'CPU',
  'Dashcam',
  'Desktop PC',
  'Digital Frame',
  'DJ Equipment',
  'Drone',
  'E-Reader',
  'External Sound Card',
  'Fitness Tracker',
  'Game Console',
  'Gaming Chair',
  'Gaming Controller',
  'Graphics Card',
  'Hard Drive',
  'Headphone',
  'Home Theater',
  'Keyboard',
  'Laptop',
  'Lighting',
  'Microphone',
  'Monitor',
  'Motherboard',
  'Mouse',
  'Network Switch',
  'Notebook',
  'Power Supply',
  'Printer',
  'Projector',
  'RAM',
  'Receiver',
  'Router',
  'Scanner',
  'Smart Doorbell',
  'Smart Home Hub',
  'Smart Lock',
  'Smart Plug',
  'Smart Speaker',
  'Smart Thermostat',
  'Smartphone',
  'Smartwatch',
  'Soundbar',
  'SSD',
  'Streaming Device',
  'Tablet',
  'TV',
  'UPS',
  'VR Headset',
  'Walkie Talkie',
  'Weather Station',
  'Webcam',
  'WiFi Extender',
  'WiFi Router',
  'Wireless Charger',
  'Wireless Earbuds',
  'Workstation',
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
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const user = await getUser()
      setUserId(user.id)
      const result = await getProductsBrowse(60, 0)
      setProducts(result)
      if (!user.adress) {
        setAddressChoosen(false)
      }
      if (result.length === 0) {
        setNoSearchResults(true)
      }
      setLoading(false)

      setTimeout(() => {
        setShowLoadMoreButton(true)
      }, 1000)
    }
    fetchData()
  }, [])

  const loadMoreProducts = async () => {
    setIsLoadingMore(true)
    setShowLoadMoreButton(false)
    setTimeout(() => {
      setShowLoadMoreButton(true)
    }, 1000)

    const result = await getProductsBrowse(60, page * 60)
    if (result.length < 4) {
      // Wert muss angepasst werden, je nach dem wie viele Produkte man mehr Laden moechte
      setHasMoreProducts(false)
    }

    setProducts((prevProducts) => [...prevProducts, ...result])
    if (result.length === 0) {
      setNoSearchResults(true)
    } else {
      setNoSearchResults(false)
    }
    setPage((prevPage) => prevPage + 1)
    setIsLoadingMore(false)

    setTimeout(() => {
      setShowLoadMoreButton(true)
    }, 1000)
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
      result = await getProductsBrowse(60, 0)
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
        <OnboardingBrowseCard />
      )}
      <div
        className={`${loading && `h-full`} flex w-full flex-col items-center justify-center  px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
      >
        <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
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
            noSuggestions={props.searchTranslations.noSuggestions}
          />
          <div className="flex w-full flex-row justify-between lg:w-auto lg:justify-normal">
            <SortProducts setProducts={setProducts} translations={props.sortTranslations} />
            <FilterProducts setProducts={setProducts} translations={props.filterTranslations} />
          </div>
        </div>
        {!loading ? (
          <>
            <div className="mt-[20px] grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4 sm:gap-x-14 md:grid-cols-4 md:gap-x-7 lg:grid-cols-5 ">
              {products.map((p, index) => (
                <div key={`kp-${index}`}>
                  <AnimatedCard delay={0.3}>
                    <CardWithImage
                      key={`pr-${index}`}
                      className="mx-auto" // Optional: h-[400px] w-[200px]
                      product={products[index]}
                      favIcon
                      editable={false}
                      viewTranslation={props.viewTranslations}
                    />
                  </AnimatedCard>
                </div>
              ))}
            </div>
            <div className="mb-6 mt-4 flex justify-center">
              {noSearchResults ? (
                <div>{props.searchTranslations.noResults}</div>
              ) : (
                hasMoreProducts &&
                showLoadMoreButton && (
                  <Button onClick={loadMoreProducts} disabled={isLoadingMore} variant="default">
                    {isLoadingMore ? 'Loading...' : 'Load More'}
                  </Button>
                )
              )}
            </div>
          </>
        ) : (
          <LoadingSkeletonBrowse />
        )}
      </div>
    </>
  )
}

export default BrowseContent
