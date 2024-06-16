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
import { useToast } from '../ui/use-toast'
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
const suggestions = [
  'Reciever',
  'Monitor',
  'Audio',
  'Laptop',
  'Headphone',
  'Smartphone',
  'Tablet',
  'Smartwatch',
  'Printer',
  'Camera',
  'Speaker',
  'Projector',
  'Game Console',
  'Drone',
  'Router',
  'Hard Drive',
  'SSD',
  'Keyboard',
  'Mouse',
  'Graphics Card',
  'Motherboard',
  'Power Supply',
  'RAM',
  'Cooling System',
  'VR Headset',
  'E-Reader',
  'Fitness Tracker',
  'Charger',
]

export const FilterProducts = (props: {
  setProducts: (value: SetStateAction<ProductType[]>) => void
}) => {
  const [highestPrice, sethighestPrice] = useState(0)
  const form = useForm({})

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
  }

  async function onFilterDelete() {
    const result = await getProductsBrowse()
    props.setProducts(result)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">filter</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[23.5rem]">
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
                      <Select onValueChange={field.onChange}>
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
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-48 rounded-2xl py-5">
                          <SelectValue placeholder="choose Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {suggestions.map((item) => (
                              <SelectItem key={item} value={item.toLowerCase()}>
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
                        checked={field.value}
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
                    <FormLabel>Max. Price: {value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={highestPrice}
                        step={1}
                        defaultValue={[highestPrice]}
                        onValueChange={onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between">
                <Button className="mt-4 h-8 w-4/12" type="submit">
                  filter
                </Button>
                <Button className="mt-4 h-8 w-4/12" onClick={onFilterDelete}>
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
