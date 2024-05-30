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
import { getUser, saveUserLocation, saveUserName } from '@/lib/useraction'
import { useEffect, useState } from 'react'

const formSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9äöüÄÖÜß\s]+$/, { message: 'No special characters allowed' })
    .min(4)
    .max(60),
})

export default function NameChanger() {
  const [name, setName] = useState<string>('')
  useEffect(() => {
    const getProduct = async () => {
      const result = await getUser()
      const r = result![0]
      setName(r.name ?? '')
    }
    getProduct()
  }, [])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveUserName(values.name)
  }

  return (
    <>
      <Form {...form}>
        <FormLabel>change Name</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row items-end gap-1">
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input {...field} defaultValue={name} />
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
