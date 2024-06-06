'use client'
import { Input } from '@/components/ui/input'
import {
  getProductsBrowse,
  getProductsByCategory,
  searchProductsByTitle,
} from '@/lib/productaction'
import { BrowseContentProps, ProductType, SearchBarProps, RevealOnScrollProps } from '@/lib/types'
import { useEffect, useState, useRef } from 'react'
import { SlClose } from 'react-icons/sl'
import { CardWithImage } from '../ui/cardWithImage'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const BrowseContent = (props: BrowseContentProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [noSearchResults, setNoSearchResults] = useState(false)

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
            // quantity: item.quantity,
            category: item.category ?? '',
            sellerId: item.sellerId,
            createdAt: item.createdAt,
            imageUrl1: item.imageUrl1,
            imageUrl2: item.imageUrl2,
            imageUrl3: item.imageUrl3,
            imageUrl4: item.imageUrl4,
            imageUrl5: item.imageUrl5,
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
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error)
      }
    }
    getProducts()
  }, [])

  const loadProductsByCategory = async (category: string) => {
    try {
      setLoading(true)
      const result = await getProductsByCategory(category)
      if (result) {
        const checkedResults: ProductType[] = result.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? '',
          price: item.price,
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
        if (checkedResults.length === 0) {
          setNoSearchResults(true)
        } else {
          setNoSearchResults(false)
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadProductsByTitle = async (title: string) => {
    try {
      setLoading(true)
      let result
      if (title === '') {
        result = await getProductsBrowse()
      } else {
        result = await searchProductsByTitle(title)
      }
      const checkedResults: ProductType[] = result!.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description ?? '',
        price: item.price,
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
      if (checkedResults.length === 0) {
        setNoSearchResults(true)
      } else {
        setNoSearchResults(false)
      }
    } catch (error) {
      console.error('Fehler bei der Suche:', error)
    } finally {
      setLoading(false)
    }
  }

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
  return (
    <div
      className={`${loading && `h-full`} flex w-full flex-col items-center justify-center  px-4 sm:px-10 md:px-[20px] lg:px-[30px] xl:px-[80px]`}
    >
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
      {!loading ? (
        <div className="-mx-2 mt-[20px] flex flex-wrap justify-around overflow-y-hidden">
          {products.map((p, index) => (
            <div key={`kp-${index}`}>
              {/* <RevealOnScroll key={`prx-${index}`}> */}
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
              {/* </RevealOnScroll> */}
            </div>
          ))}
          {noSearchResults && <div className="px-4 text-black">Keine Suchergebnisse gefunden</div>}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="h-20 w-20 animate-ping rounded-[30px] bg-black"></div>
        </div>
      )}
    </div>
  )
}

const SearchDialog = (
  props: SearchBarProps & {
    loadProductsByCategory: (category: string) => void
    loadProductsByTitle: (title: string) => void
  },
) => {
  const [open, setOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1) // Index für ausgesuchten Vorschlag

  // Funktion zum Filtern der Ergebnisse auf Basis der aktuellen Eingabe
  const searchValueRef = useRef<string>('')
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    props.setSearchValue(value)
    if (value.length > 0) {
      const filtered = props.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }

  const handleSearch = async () => {
    setOpen(false)
    if (props.searchValue === '') {
      props.loadProductsByTitle('')
      return
    }

    const titleResults = await searchProductsByTitle(props.searchValue)
    if (titleResults.length > 0) {
      props.loadProductsByTitle(props.searchValue)
    } else {
      props.loadProductsByCategory(props.searchValue)
    }
  }

  // Funktion für die Suhce mit Klick auf einem Vorschlag
  const handleSuggestionClick = (suggestion: string) => {
    setOpen(false)
    props.setSearchValue(suggestion)
    props.loadProductsByTitle(suggestion)
    props.loadProductsByCategory(suggestion)
  }

  // Funktion zum Handhaben der Tastaturereignisse
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => {
        const suggestionsList =
          filteredSuggestions.length > 0 ? filteredSuggestions : props.suggestions
        const newIndex = (prevIndex + 1) % suggestionsList.length
        props.setSearchValue(suggestionsList[newIndex])
        return newIndex
      })
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => {
        const suggestionsList =
          filteredSuggestions.length > 0 ? filteredSuggestions : props.suggestions
        const newIndex = (prevIndex - 1 + suggestionsList.length) % suggestionsList.length
        props.setSearchValue(suggestionsList[newIndex])
        return newIndex
      })
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
        setOpen(false)
        props.setSearchValue(filteredSuggestions[selectedIndex])
        setFilteredSuggestions([])
        props.loadProductsByTitle(filteredSuggestions[selectedIndex])
        props.loadProductsByCategory(filteredSuggestions[selectedIndex])
      } else {
        // Wenn kein Vorschlag ausgewählt ist, führen Sie eine Standardsuche aus
        handleSearch()
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Input
          className="sticky top-[20px] h-14 w-full bg-background md:w-2/3"
          type="search"
          placeholder={props.searchValue ? props.searchValue : props.placeholder}
          readOnly
        />
      </DialogTrigger>
      <DialogContent className="gap-0 border-0  p-0">
        <div className="flex">
          <Input
            className="rounded-t-l m-0 h-14 rounded-b-none px-4"
            type="input"
            placeholder={props.placeholder}
            onChange={handleSearchChange}
            value={props.searchValue ? props.searchValue : ''}
            onKeyDown={handleKeyDown}
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
            <h1 className="px-4 pt-2 text-lg font-medium ">{props.suggestionsTitle}</h1>
            <div className="max-h-[200px] overflow-y-auto">
              {props.suggestions.map((suggestion, index) => (
                <div
                  onClick={() => {
                    setOpen(false)
                    props.setSearchValue(suggestion)
                  }}
                  className="rounded- px-8 py-2 hover:rounded-b-lg hover:bg-input"
                  key={`s-${index}`}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-h-[200px] overflow-y-auto px-4 py-2">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                <div
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded- px-8 py-2 text-black hover:rounded-b-lg hover:bg-gray-100"
                  key={`fs-${index}`}
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <div className="px-4 text-black">Keine Vorschläge gefunden</div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BrowseContent
