'use client'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '../ui/checkbox'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { filterProducts, getMostExpensiveProduct, getProductsBrowse } from '@/lib/product-actions'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SetStateAction } from 'react'
import { ProductType } from '@/schema'
import { largestGermanCities, suggestions } from '@/lib/utils'

export const FilterProducts = (props: {
  setProducts: (value: SetStateAction<ProductType[]>) => void
}) => {
  const [highestPrice, sethighestPrice] = useState(0)
  const [open, setOpen] = useState(false)
  const [isEdited, setisEdited] = useState(false)
  const [selectedValue, setSelectedValue] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDirectlyBuyable, setSelectedDirectlyBuyable] = useState(false)

  const form = useForm({
    defaultValues: {
      category: '',
      location: '',
      isDirectlyBuyable: false,
      price: [highestPrice],
    },
  })

  useEffect(() => {
    const getHighestPrice = async () => {
      const result = await getMostExpensiveProduct()
      sethighestPrice(result.price)
      form.setValue('price', [result.price])
    }
    getHighestPrice()
  }, [form])

  async function onSubmit(values: any) {
    values.price = values.price[0]
    const result = await filterProducts(values)
    props.setProducts(result)
    setSelectedCategory(values.category)
    setSelectedLocation(values.location)
    setSelectedDirectlyBuyable(values.isDirectlyBuyable)
    setSelectedValue(values.price)
    setisEdited(true)
  }

  async function onFilterDelete() {
    form.reset({ category: '', location: '', isDirectlyBuyable: false, price: [highestPrice] })
    const result = await getProductsBrowse()
    props.setProducts(result)
    setOpen(false)
    setisEdited(false)
    setSelectedDirectlyBuyable(false)
  }

  function close() {
    setOpen(!open)
    form.setValue('price', [selectedValue])
    if (!isEdited) {
      form.reset({ category: '', location: '', isDirectlyBuyable: false, price: [highestPrice] })
    }
  }
  return (
    <>
      <Popover open={open} onOpenChange={close}>
        <PopoverTrigger asChild>
          <Button variant="outline">filter</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[23.5rem] bg-card">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <FormLabel className=" text-base font-semibold">Category</FormLabel>
              <hr className="my-[-14px]" />
              <FormField
                control={form.control}
                name={'category'}
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={isEdited ? selectedCategory : undefined}
                      >
                        <SelectTrigger className="w-48 rounded-2xl py-5">
                          <SelectValue placeholder="choose Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {suggestions.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormLabel className=" text-base font-semibold">Location</FormLabel>
              <hr className="my-[-14px]" />
              <FormField
                control={form.control}
                name={'location'}
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={isEdited ? selectedLocation : undefined}
                      >
                        <SelectTrigger className="w-48 rounded-2xl py-5">
                          <SelectValue placeholder="choose Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {largestGermanCities.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormLabel className="text-base font-semibold">how to buy?</FormLabel>
              <hr className="my-[-14px]" />
              <FormField
                control={form.control}
                name={'isDirectlyBuyable'}
                render={({ field }) => (
                  <FormItem className="flex w-48 flex-row items-start space-x-3 space-y-0 rounded-2xl border p-3">
                    <FormControl>
                      <Checkbox
                        className="rounded-md"
                        defaultChecked={selectedDirectlyBuyable}
                        // checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>is directly buyable</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel className="text-base font-semibold">Price</FormLabel>
              <hr className="my-[-14px]" />

              <FormField
                control={form.control}
                name="price"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>{'Max. Price: ' + value}</FormLabel>
                    <FormControl>
                      {isEdited ? (
                        <Slider
                          min={0}
                          max={highestPrice}
                          step={1}
                          defaultValue={[selectedValue]}
                          // value={value}
                          onValueChange={onChange}
                        />
                      ) : (
                        <Slider
                          min={0}
                          max={highestPrice}
                          step={1}
                          defaultValue={[highestPrice]}
                          onValueChange={onChange}
                        />
                      )}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <Button
                  className="mt-4 h-8 w-4/12 bg-card-button"
                  type="submit"
                  variant={'default'}
                >
                  filter
                </Button>
                <Button
                  className="mt-4 h-8 w-4/12 bg-card-button"
                  onClick={onFilterDelete}
                  type="button"
                >
                  delete filter
                </Button>
              </div>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </>
  )
}
