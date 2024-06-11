'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sortProducts } from '@/lib/product-actions'
import { ProductType, SortProductsProps } from '@/lib/types'
import { ProductTypeTest } from '@/schema'
import { SetStateAction } from 'react'

export const SortProducts = (params: {
  translations: SortProductsProps
  setProducts: (value: SetStateAction<ProductTypeTest[]>) => void
}) => {
  const sort = async (value: string) => {
    const result = await sortProducts(value)
    params.setProducts(result)
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <p>{params.translations.sortBy}</p>
      <Select onValueChange={(value) => sort(value)}>
        <SelectTrigger className="w-[5.4rem] border-0 px-3 shadow-none">
          <SelectValue placeholder={params.translations.date} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="createdAt">{params.translations.date}</SelectItem>
            <SelectItem value="price">{params.translations.price}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
