'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '../ui/separator'
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { getMostExpensiveProduct } from '@/lib/product-actions'
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

export const FilterProducts = () => {
  const [open, setOpen] = useState(false)
  const [highestPrice, sethighestPrice] = useState(0)
  const form = useForm()
  const { toast } = useToast()

  useEffect(() => {
    const getHighestPrice = async () => {
      const result = await getMostExpensiveProduct()
      console.log(result)
    }
    getHighestPrice()
  }, [])

  function close() {
    setOpen(false)
  }

  async function onSubmit(values: any) {
    console.log(values)
    toast({
      title: highestPrice.toString(),
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">filter</Button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[625px]">
          <DialogHeader>
            <DialogDescription>choose how you want to filter</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <FormLabel className=" text-base font-semibold">Category</FormLabel>
              <hr className="my-[-14px]" />
              <FormField
                control={form.control}
                name={'adress'}
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Select>
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
                name={'isDirectlyBuyable'}
                render={({ field }) => (
                  <FormItem className="flex w-48 flex-row items-start space-x-3 space-y-0 rounded-2xl border p-3">
                    <FormControl>
                      <Slider defaultValue={[100]} max={100} step={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4" type="submit" variant={'secondary'}>
                change
              </Button>
            </form>
          </Form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
