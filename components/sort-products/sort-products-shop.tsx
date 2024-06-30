'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sortProducts, sortProductsShop } from '@/lib/product-actions'
import { SortProductsProps } from '@/lib/types'
import { ProductType } from '@/schema'
import { SetStateAction } from 'react'

export const SortProductsShop = (params: { userId: string; action: (value: string) => void }) => {
  const sort = async (value: string) => {
    params.action(value)
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <p>sort By</p>
      <Select onValueChange={(value) => sort(value)}>
        <SelectTrigger className="w-[5.4rem] border-0 px-3 shadow-none focus:ring-0">
          <SelectValue
            className="border-none outline-none ring-0"
            // placeholder={params.translations.date}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className="hover:cursor-pointer" value="createdAt">
              date
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="price">
              price
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
