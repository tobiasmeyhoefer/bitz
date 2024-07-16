/**
 * A React component that renders a sort dropdown for products.
 *
 * @param {sortProps} params - The props for the SortProducts component.
 * @param {SortProductsProps} params.translations - The translations for the sort options.
 * @param {(value: SetStateAction<ProductType[]>) => void} params.setProducts - A function to set the products to be displayed.
 * @param {string} [params.userId] - An optional user ID for sorting products for a specific user.
 * @returns {JSX.Element} - The rendered SortProducts component.
 */
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

type sortProps = {
  translations: SortProductsProps
  setProducts: (value: SetStateAction<ProductType[]>) => void
  userId?: string
}

export const SortProducts = (params: sortProps) => {
  const sort = async (value: string) => {
    let result = []
    if (params.userId) {
      result = await sortProductsShop(value, params.userId)
    } else {
      result = await sortProducts(value)
    }
    params.setProducts(result)
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <p>{params.translations.sortBy}</p>
      <Select onValueChange={(value) => sort(value)}>
        <SelectTrigger className="w-[5.4rem] border-0 px-3 shadow-none focus:ring-0">
          <SelectValue
            className="border-none outline-none ring-0"
            placeholder={params.translations.date}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className="hover:cursor-pointer" value="createdAt">
              {params.translations.date}
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="price">
              {params.translations.price}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
