'use client'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog'
import { SearchBarProps, SearchTranslations } from '@/lib/types'
import { SlClose } from 'react-icons/sl'

export default function SearchDialog(props: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const translations: SearchTranslations = props.translations

  const suggestions = ['Receiver', 'Monitor', 'Audio', 'Laptop', 'Headphone']

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Input
          className="sticky top-[20px] h-14 w-full bg-background  sm:w-2/3 md:w-1/2"
          type="search"
          placeholder={searchValue.length > 0 ? searchValue : translations.searchPlaceholder}
          readOnly
        />
      </DialogTrigger>
      <DialogContent className="gap-0 border-0  p-0">
        <div className="flex">
          <Input
            className="rounded-t-l m-0 h-14 rounded-b-none px-4"
            type="input"
            placeholder={searchValue.length > 0 ? searchValue : translations.searchPlaceholder}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue ? searchValue : ''}
            onKeyDown={(e) => e.key === 'Enter' && setOpen(false)} // Data fetching trigger
          />
          {searchValue.length > 0 && (
            <SlClose
              onClick={() => setSearchValue('')}
              className="absolute right-[20px] top-[20%] h-[20px] w-[20px]"
            />
          )}
        </div>
        {!searchValue ? (
          <>
            <h1 className="px-4 pt-2 text-lg font-medium ">{translations.suggestions}</h1>
            {suggestions.map((suggestion, index) => (
              <div
                onClick={() => {
                  setOpen(false)
                  setSearchValue(suggestion)
                }}
                className="rounded- px-8 py-2 hover:rounded-b-lg hover:bg-input"
                key={`s-${index}`}
              >
                {suggestion}
              </div>
            ))}
          </>
        ) : (
          <div className="px-4 py-2">{searchValue}</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
