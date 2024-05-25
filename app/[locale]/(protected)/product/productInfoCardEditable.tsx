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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

type ProductInfoEditType = {
  productInfo: any
}
const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  price: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  quantity: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export default function ProductInfoCardEditable(props: any) {
  const product = props.productInfo
  const translations = props.translations
  const date = props.date
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [quantity, setQuantity] = useState(product.quantity)
  const [description, setDescription] = useState(product.description)

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTitle(product.title)
    setPrice(product.price)
    setQuantity(product.quantity)
    setDescription(product.description)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    //     defaultValues: {
    //       username: '',
    //     },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'Some Toast',
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
                      <Input {...field} value={title} onChange={(e) => setTitle(e.target.value)} />
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
                      <Input
                        {...field}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{' '}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.quantity}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How many?"
                        {...field}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                      />
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit">{translations.submitTitle}</Button>
                <Button onClick={handleCancel}>{translations.cancel}</Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <>
          {/* <Card className="my-3 h-full w-[90vw] lg:my-0 lg:h-[60vh] lg:min-h-[60vh] lg:w-[40vw]">
            <CardHeader className="flex h-[20%] flex-row items-center justify-between">
              <CardTitle className="text-center">{title}</CardTitle>
              <CardTitle className="text-3xl">
                {price} {props.locale === 'en' ? '$' : '€'}
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex h-[40vh] min-h-[80%] flex-col justify-between p-6">
              <div className="flex justify-between text-wrap pb-6">
                <div className="h-fit w-9/12 break-words">{description}</div>
                {`${translations.quantity}: ${quantity}`}
              </div>
              <div className="flex flex-col justify-end">
                {date}
                <Button className="ml-auto mt-2 w-1/2" size={'lg'} onClick={handleEditClick}>
                  {translations.edit}
                </Button>
              </div>
            </CardContent>
          </Card> */}
          <Card className="my-3 h-full w-[90vw] lg:my-0 lg:h-[60vh] lg:min-h-[60vh] lg:w-[40vw]">
            <CardHeader className="flex h-[20%] flex-row items-center justify-between">
              <CardTitle className="text-center">{title}</CardTitle>
              <CardTitle className="text-3xl">{price}</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex min-h-[80%] flex-col justify-between p-6">
              <div className="flex justify-between text-wrap pb-6">
                <div className="h-fit w-9/12 break-words">{description}</div>
                <div className="whitespace-nowrap text-right lg:w-[20vw]">
                  {translations.quantity}: {quantity}
                </div>
              </div>
              <div className="flex flex-col justify-end">
                {date}
                <Button className="ml-auto mt-2 w-1/2" size={'lg'} onClick={handleEditClick}>
                  {translations.edit}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
