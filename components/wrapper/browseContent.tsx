'use client'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import { BrowseContentProps, SearchBarProps } from '@/lib/types'

const BrowseContent = (props: BrowseContentProps) => {
  const [searchValue, setSearchValue] = useState('')

  // Replace with real data
  const suggestions = ['Receiver', 'Monitor', 'Audio', 'Laptop', 'Headphone']

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-20 py-20">
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
    </div>
  )
}

const SearchDialog = (props: SearchBarProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Input
          className="h-14 w-1/2"
          type="search"
          placeholder={
            props.searchValue ? props.searchValue : props.placeholder
          }
          readOnly
        />
      </DialogTrigger>
      <DialogContent className="gap-0 border-0 p-0">
        <Input
          className="rounded-t-l m-0 h-14 rounded-b-none px-4"
          type="search"
          placeholder={props.placeholder}
          onChange={(e) => props.setSearchValue(e.target.value)}
          value={props.searchValue ? props.searchValue : ''}
          onKeyDown={() => setOpen(false)} // Data fetching trigger
        />
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

export default BrowseContent
