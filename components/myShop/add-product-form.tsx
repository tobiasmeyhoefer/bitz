'use client'
import { Input } from '../ui/input'
import { addProduct } from '@/lib/action'
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
import { ProductType} from '@/models/product-model'

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

export function AddProductForm({ submitText, action, locationSet}: { submitText: string , action: (values: ProductType) => Promise<void> , locationSet:boolean}) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  })

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
