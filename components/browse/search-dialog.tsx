/**
 * The `SearchDialog` component provides a search input field with suggestions and functionality to search for products by title or category.
 *
 * @param props - An object containing the following properties:
 *   - `searchValue`: The current value of the search input field.
 *   - `setSearchValue`: A function to update the search input field value.
 *   - `suggestions`: An array of suggested search terms.
 *   - `suggestionsTitle`: The title to display above the suggestions.
 *   - `loadProductsByCategory`: A function to load products by a given category.
 *   - `loadProductsByTitle`: A function to load products by a given title.
 *   - `userId`: The ID of the current user.
 *
 * @returns The `SearchDialog` component.
 */
'use client'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Input } from '@/components/ui/input'
import { SlClose } from 'react-icons/sl'
import { useState } from 'react'
import { SearchBarProps } from '@/lib/types'
import { getProductsByName, searchProductsByTitle } from '@/lib/product-actions'

export const SearchDialog = (
  props: SearchBarProps & {
    loadProductsByCategory: (category: string) => void
    loadProductsByTitle: (title: string) => void
    userId: string
  },
) => {
  const [open, setOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1) // Index für ausgesuchten Vorschlag

  // Funktion zum Filtern der Ergebnisse auf Basis der aktuellen Eingabe
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    props.setSearchValue(value)
    if (value.length > 0) {
      const filtered = props.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      )
      //FÜR SPÄTERE IMPLEMENTIERUNG
      // const realProductTitles = await getProductsByName(value)
      // setFilteredSuggestions(filtered.concat(realProductTitles))
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

    const titleResults = await searchProductsByTitle(props.searchValue, props.userId)
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

    if (props.suggestions.includes(suggestion)) {
      props.loadProductsByCategory(suggestion)
      return
    }

    props.loadProductsByTitle(suggestion)
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
      <DialogContent className="gap-0 border-0 p-0">
        <div className="relative flex">
          <Input
            className="m-0 h-14 flex-grow rounded-bl rounded-br-none rounded-tl rounded-tr-none px-4" // "rounded-t-l m-0 h-14 rounded-b-none px-4"
            type="input"
            placeholder={props.placeholder}
            onChange={handleSearchChange}
            value={props.searchValue ? props.searchValue : ''}
            onKeyDown={handleKeyDown}
          />
          {props.searchValue.length > 0 && (
            <SlClose
              onClick={() => props.setSearchValue('')}
              className="absolute right-4 top-1/2 h-[20px] w-[20px] -translate-y-1/2 transform cursor-pointer" // "absolute right-[20px] top-[20%] h-[20px] w-[20px]"
            />
          )}
        </div>
        {!props.searchValue ? (
          <>
            <h1 className="px-4 pt-2 text-lg font-medium">{props.suggestionsTitle}</h1>
            <div className="max-h-[200px] overflow-y-auto">
              {props.suggestions.map((suggestion, index) => (
                <div
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded- px-8 py-2 hover:cursor-pointer hover:rounded-b-lg hover:bg-input"
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
                  className="rounded- px-8 py-2  hover:cursor-pointer hover:rounded-b-lg hover:bg-gray-100"
                  key={`fs-${index}`}
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <div className="px-4 ">{props.noSuggestions}</div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
