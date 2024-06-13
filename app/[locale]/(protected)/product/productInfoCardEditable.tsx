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
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { updateProduct } from '@/lib/product-actions'
import { ProductType } from '@/schema'

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
})

export default function ProductInfoCardEditable(props: {
  productInfo: ProductType
  translations: {
    title: string
    price: string
    description: string
    cancel: string
    save: string
    edit: string
  }
  locale: string
}) {
  const initialProduct: ProductType = props.productInfo
  const translations = props.translations
  const [isEditing, setIsEditing] = useState(false)
  const [product, setProduct] = useState(initialProduct)

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.reset({
      title: product.title,
      price: product.price,
      description: product.description!,
    })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description!,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const updatedProduct = {
      ...product,
      ...data,
    }
    setProduct(updatedProduct)
    updateProduct(initialProduct.id!, updatedProduct)
    toast({
      title: 'Changes applied',
    })
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <div className="my-3 flex h-full w-[90vw] justify-center lg:my-0 lg:h-[60vh] lg:w-[40vw]">
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
        <div className="h-[50vh] w-[90vw] lg:h-[60vh] lg:w-[40vw] 2xl:w-[60vh]">
          <Card className="mt-2 flex h-full flex-col justify-between lg:mt-0 lg:h-[60vh]">
            <div>
              <CardHeader className="flex h-[10vh] flex-row items-center justify-between">
                <CardTitle className="text-center">{product.title}</CardTitle>
                <CardTitle className="text-3xl">{product.price}€</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="flex min-h-[30vh] flex-col justify-between p-6 pb-0">
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
