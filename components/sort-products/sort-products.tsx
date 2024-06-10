import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SortProductsProps } from '@/lib/types'

export const SortProducts = (params: {
  action: (value: string) => void
  translations: SortProductsProps
}) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <p>{params.translations.sortBy}</p>
      <Select onValueChange={(value) => params.action(value)}>
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
