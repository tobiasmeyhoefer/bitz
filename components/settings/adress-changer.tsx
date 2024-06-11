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
import { getUser, saveUserAdress } from '@/lib/user-actions'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'

const formSchema = z.object({
  adress: z
    .string()
    .regex(/^[a-zA-Z0-9äöüÄÖÜß\s]+$/, { message: 'No special characters allowed' })
    .min(4)
    .max(60),
})

export default function AdressChanger() {
  const [adress, setAdress] = useState<string>('')
  const { toast } = useToast()
  useEffect(() => {
    const getProduct = async () => {
      const user = await getUser()
      setAdress(user.adress ?? '')
    }
    getProduct()
  }, [])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveUserAdress(values.adress)
    toast({
      title: 'Address changed successfully ✅',
    })
  }

  return (
    <div className="mb-6">
      <Form {...form}>
        <FormLabel>change Adress</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={'adress'}
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input {...field} defaultValue={adress} />
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
