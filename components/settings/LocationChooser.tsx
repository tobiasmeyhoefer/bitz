'use client'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { saveUserLocation } from '@/lib/action'

const formSchema = z.object({
  city: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => typeof value === 'string' && !/^\d+$/.test(value)),
  postcode: z.coerce.number().safe().positive(),
})

export default function LocationChooser() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveUserLocation(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className= "flex flex-row items-end gap-1">
          <FormField
            control={form.control}
            name={'city'}
            render={({ field }) => (
              <FormItem>
                <FormMessage/>
                <FormControl>
                  <Input placeholder="city" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'postcode'}
            render={({ field }) => (
              <FormItem>
                <FormMessage/>
                <FormControl>
                  <Input placeholder="postcode" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="mt-4" type="submit">
            submit
          </Button>
        </form>
      </Form>
    </>
  )
}
