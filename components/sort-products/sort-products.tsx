import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const SortProducts = (params: { action: (value: string) => void }) => {
  return (
    <>
      <Select onValueChange={(value) => params.action(value)}>
        <SelectTrigger className="w-28 ">
          <SelectValue placeholder="filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>filter by</SelectLabel>
            <SelectItem value="createdAt">date</SelectItem>
            <SelectItem value="price">price</SelectItem>
            <SelectItem value="title">title</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
