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
import { saveUserLocation } from '@/lib/useraction'

const formSchema = z.object({
  postcode: z.string().regex(/^\d+$/).length(5)
})

export default function LocationChooser({postcode} : {postcode: string}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveUserLocation(values)
    form.reset({
      postcode: "",
  });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className= "flex flex-row items-end gap-1">
          <FormField
            control={form.control}
            name={'postcode'}
            render={({ field }) => (
              <FormItem>
                <FormMessage/>
                <FormControl>
                  <Input placeholder={postcode} {...field} />
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
