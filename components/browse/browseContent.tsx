'use client'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import { BrowseContentProps, SearchBarProps, RevealOnScrollProps, ProductType } from '@/lib/types'
import { CardWithImage } from '../ui/cardWithImage'
import { SlClose } from 'react-icons/sl'
import { getProductsBrowse, getProductsByCategory } from '@/lib/productaction'
import RevealOnScroll from '../navigation/revealOnScroll'

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
    } finally {
      setLoading(false)
    }
  }

  const suggestions = [
    'Receiver', 'Monitor', 'Audio', 'Laptop', 'Headphone', 'Smartphone', 'Tablet', 'Smartwatch', 'Printer', 'Camera',
    'Speaker', 'Projector', 'Game Console', 'Drone', 'Router', 'Hard Drive', 'SSD', 'Keyboard', 'Mouse', 'Graphics Card', 'Motherboard',
    'Power Supply', 'RAM', 'Cooling System', 'VR Headset', 'E-Reader', 'Fitness Tracker', 'Charger'
  ]

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
        loadProductsByCategory={loadProductsByCategory}
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

const SearchDialog = (props: SearchBarProps & { loadProductsByCategory: (category: string) => void }) => {
  const [open, setOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1) // Index für ausgesuchten Vorschlag

  // Funktion zum Filtern der Ergebnisse auf Basis der aktuellen Eingabe 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    props.setSearchValue(value)
    if (value.length > 0) {
      const filtered = props.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }

  // Funktion für die Suhce mit Klick auf einem Vorschlag
  const handleSuggestionClick = (suggestion: string) => {
    setOpen(false)
    props.setSearchValue(suggestion)
    props.loadProductsByCategory(suggestion)
  }

  // Funktion zum Handhaben der Tastaturereignisse
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % filteredSuggestions.length
        props.setSearchValue(filteredSuggestions[newIndex])
        return newIndex
      })
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => {
        const newIndex = (prevIndex - 1 + filteredSuggestions.length) % filteredSuggestions.length
        props.setSearchValue(filteredSuggestions[newIndex])
        return newIndex
      })
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
        props.setSearchValue(filteredSuggestions[selectedIndex])
        setFilteredSuggestions([])
        setOpen(false)
        props.loadProductsByCategory(props.searchValue)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Input
          className="sticky top-[20px] h-14 w-full bg-background  sm:w-2/3 md:w-1/2"
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
          </>
        ) : (
          <div className="px-4 py-2">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <div
                  onClick={ () => handleSuggestionClick(suggestion) }
                  className="rounded- px-8 py-2 text-black hover:rounded-b-lg hover:bg-gray-100"
                  key={`fs-${index}`}
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <div className="text-black px-4">Keine Vorschläge gefunden</div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BrowseContent
