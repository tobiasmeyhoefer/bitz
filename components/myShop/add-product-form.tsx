'use client'
import { FullProductType, ProductType} from '@/models/product-model'
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input'
import { getProductById } from '@/lib/action'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { Button } from '../ui/button'
import { useRouter } from '@/navigation'

const minError = 'Eingabe erfordert'
const formSchema = z.object({
  title: z.string().min(1, { message: minError }).max(50),
  price: z.coerce.number().safe().positive(),
  quantity: z.coerce.number().safe().positive(),
  location: z.string().min(1, { message: minError }).max(50),
  status: z.string().min(1, { message: minError }).max(50),
  currency: z.string().min(1, { message: minError }).max(30).refine((value) => typeof value === 'string' && !/^\d+$/.test(value)),
  description: z.string().min(1, { message: minError }).max(250),
})

export function AddProductForm({ submitText, action, locationSet, whichFunction}: { submitText: string , action: (values: ProductType) => Promise<void> , locationSet:boolean, whichFunction:string}) {
  const [data, setData] = useState<FullProductType>({
    id: '', // Falls notwendig, fülle `id` mit einem Standardwert
    title: '',
    description: '',
    price: 2,
    currency: '',
    quantity: 2,
    location: '',
    status: '',
    sellerId: '',
    image: '',
    createdAt: new Date(),
  });

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await getProductById('c712fb22-42ac-4dfa-a557-4b709df293ba');
        const r = result[0]
        console.log("----------" + r)
        setData(r);
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    };

    getProduct();
  }, []);

  const router = useRouter()
  let defaultValues
  if (whichFunction === 'update' || data.title != ''){
    defaultValues = {
      title: data.title!,
      description : data.description!,
      price: data.price!,
      currency: data.currency!,
      quantity: data.quantity!,
      location: data.location!,
      status: data.status!,
      id: ""
    };
  }

  // Ruf useForm auf und übergib die ausgewählten defaultValues
  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: data.title!,
        description : data.description!,
        price: data.price!,
        currency: data.currency!,
        quantity: data.quantity!,
        location: data.location!,
        status: data.status!,
        id: ""
      },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await action(values)
    router.push('/myshop')
  }

  return (
    <>
      <Card className=" w-[500px] p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel> Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'price'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'currency'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="currency" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'quantity'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="quantity" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {!locationSet && (
              <FormField
                control={form.control}
                name={'location'}
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="location" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name={'status'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="status" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit">
              {submitText}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  )
}
