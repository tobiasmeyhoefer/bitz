/**
 * A React component that renders a product information card with an editable form.
 *
 * @param props - The component props:
 * @param props.productInfo - The product information to display.
 * @param props.translations - The translations for the UI elements.
 * @param props.locale - The current locale.
 * @returns A React element representing the product information card.
 */
'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '../ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { updateProduct } from '@/lib/product-actions'
import { ProductType } from '@/schema'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'

const minError = 'Eingabe erfordert'
const FormSchema = z.object({
  title: z
    .string()
    .min(1, { message: minError })
    .max(50)
    .refine((value) => !/#/.test(value)),
  price: z.coerce.number().safe().positive(),
  description: z
    .string()
    .min(1, { message: minError })
    .max(250)
    .refine((value) => !/#/.test(value)),
  category: z.string().min(1, { message: minError }).max(250).optional().default('Other'),
  isDirectlyBuyable: z.boolean().default(false).optional(),
})

const suggestions = [
  { value: 'Audio' },
  { value: 'Beamer' },
  { value: 'Bluetooth Speaker' },
  { value: 'Blu-ray Player' },
  { value: 'Camera' },
  { value: 'Charger' },
  { value: 'Cooling System' },
  { value: 'CPU' },
  { value: 'Dashcam' },
  { value: 'Desktop PC' },
  { value: 'Digital Frame' },
  { value: 'DJ Equipment' },
  { value: 'Drone' },
  { value: 'E-Reader' },
  { value: 'External Sound Card' },
  { value: 'Fitness Tracker' },
  { value: 'Game Console' },
  { value: 'Gaming Chair' },
  { value: 'Gaming Controller' },
  { value: 'Graphics Card' },
  { value: 'Hard Drive' },
  { value: 'Headphone' },
  { value: 'Home Theater' },
  { value: 'Keyboard' },
  { value: 'Laptop' },
  { value: 'Lighting' },
  { value: 'Microphone' },
  { value: 'Monitor' },
  { value: 'Motherboard' },
  { value: 'Mouse' },
  { value: 'Network Switch' },
  { value: 'Notebook' },
  { value: 'Power Supply' },
  { value: 'Printer' },
  { value: 'Projector' },
  { value: 'RAM' },
  { value: 'Receiver' },
  { value: 'Router' },
  { value: 'Scanner' },
  { value: 'Smart Doorbell' },
  { value: 'Smart Home Hub' },
  { value: 'Smart Lock' },
  { value: 'Smart Plug' },
  { value: 'Smart Speaker' },
  { value: 'Smart Thermostat' },
  { value: 'Smartphone' },
  { value: 'Smartwatch' },
  { value: 'Soundbar' },
  { value: 'SSD' },
  { value: 'Streaming Device' },
  { value: 'Tablet' },
  { value: 'TV' },
  { value: 'UPS' },
  { value: 'VR Headset' },
  { value: 'Walkie Talkie' },
  { value: 'Weather Station' },
  { value: 'Webcam' },
  { value: 'WiFi Extender' },
  { value: 'WiFi Router' },
  { value: 'Wireless Charger' },
  { value: 'Wireless Earbuds' },
  { value: 'Workstation' },
  { value: 'Other' },
]

export default function ProductInfoCardEditable(props: {
  productInfo: ProductType
  translations: {
    title: string
    price: string
    description: string
    cancel: string
    save: string
    edit: string
    category: string
    isDirectlyBuyable: string
  }
  locale: string
}) {
  const initialProduct: ProductType = props.productInfo
  const translations = props.translations
  const [isEditing, setIsEditing] = useState(false)
  const [product, setProduct] = useState(initialProduct)
  const [open, setOpen] = useState(false)
  const [categoryValue, setcategoryValue] = useState(product.category)
  const { toast } = useToast()
  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.reset({
      title: product.title,
      price: product.price,
      description: product.description!,
      category: product.category!,
      isDirectlyBuyable: product.isDirectlyBuyable!,
    })
    setcategoryValue(product.category)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description!,
      category: product.category!,
      isDirectlyBuyable: product.isDirectlyBuyable!,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const updatedProduct = {
      ...product,
      ...data,
    }
    toast({
      title: 'Changes applied ✅',
      duration: 1000,
    })
    setProduct(updatedProduct)
    updateProduct(initialProduct.id!, updatedProduct)
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <div className="my-3 flex h-full w-[90vw] justify-center lg:my-0 lg:h-[70vh] lg:w-[50vw]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.title}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.price}</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.description}</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[100px] resize-none"
                        placeholder="What is your product like?"
                        {...field}
                        maxLength={850}
                        aria-label="max"
                      />
                    </FormControl>
                    <FormDescription className="!mt-0 text-right">max. 850</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'isDirectlyBuyable'}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                    <FormLabel>{translations.isDirectlyBuyable}</FormLabel>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="leading-0"> {translations.category} </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between bg-card"
                        >
                          {categoryValue}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className=" w-[15em]">
                        <Command>
                          <CommandList>
                            <CommandInput placeholder="Search framework..." />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {suggestions.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  value={framework.value}
                                  onSelect={(currentValue: string) => {
                                    form.setValue('category', framework.value),
                                      setcategoryValue(
                                        currentValue === categoryValue ? '' : currentValue,
                                      )
                                    setOpen(false)
                                  }}
                                >
                                  <p
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      categoryValue === framework.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                  {framework.value}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit">{translations.save}</Button>
                <Button variant="secondary" onClick={handleCancel}>
                  {translations.cancel}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className=" w-[90vw] lg:h-[70vh] lg:w-[50vw]">
          <Card className="mt-2 flex h-full flex-col justify-between lg:mt-0 lg:h-[70vh]">
            <div>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="">{product.title}</CardTitle>
                <CardTitle className="!mt-0 w-1/4 text-right text-2xl md:text-3xl">
                  {product.price}€
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="flex min-h-[80%] flex-col justify-between p-6">
                <div className="h-fit break-words text-sm">{product.description}</div>
              </CardContent>
            </div>
          </Card>
          <div className="flex justify-end">
            <Button className="my-2 !ml-auto w-1/3 lg:mb-0" size={'lg'} onClick={handleEditClick}>
              {translations.edit}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
