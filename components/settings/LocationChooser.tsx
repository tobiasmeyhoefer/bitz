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
import { getUser, saveUserLocation } from '@/lib/useraction'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'

const formSchema = z.object({
  postcode: z.string().regex(/^\d+$/, { message: 'only numbers are valid' }).length(5),
})

export default function LocationChooser({ postcode }: { postcode: string }) {
  const [location, setLocation] = useState<string>('')
  const { toast } = useToast()
  useEffect(() => {
    const getProduct = async () => {
      const user = await getUser()
      setLocation(user.location ?? '')
    }
    getProduct()
  }, [])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveUserLocation(values)
    toast({
      title: 'Postcode changed successfully ✅',
    })
  }

  return (
    <div className="mb-6">
      <Form {...form}>
        <FormLabel className="mb-2">change Location</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={'postcode'}
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input placeholder={postcode} {...field} defaultValue={location} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="mt-4" type="submit" variant={'secondary'}>
            change
          </Button>
        </form>
      </Form>
    </div>
  )
}
