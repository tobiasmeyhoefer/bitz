'use client'
import { RxCross2 } from 'react-icons/rx'
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
import { getUser, saveUserName } from '@/lib/user-actions'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'

const formSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9äöüÄÖÜß\s]+$/, { message: 'No special characters allowed' })
    .min(4)
    .max(60),
})

interface NameChangerProps {
  translations: {
    username: string
    changeName: string
    changeNow: string
  }
}

export default function NameChanger({ translations }: NameChangerProps) {
  const [name, setName] = useState<string>('')
  const { toast } = useToast()
  useEffect(() => {
    const getProduct = async () => {
      const user = await getUser()
      setName(user.name ?? '')
    }
    getProduct()
  }, [])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveUserName(values.name)
    toast({
      title: 'Username changed successfully ✅',
      duration: 2000,
    })
  }

  return (
    <div className="mb-6">
      <Form {...form}>
        <FormLabel>{translations.changeName}</FormLabel>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem className="w-[calc(100%-40px)]">
                  <FormMessage />
                  <FormControl>
                    <Input {...field} defaultValue={name} />
                  </FormControl>
                </FormItem>
              )}
            />
            <RxCross2
              size={22}
              onClick={() => form.reset({ name: name })}
              className="hover:cursor-pointer"
            />
          </div>
          <Button className="mt-4" type="submit">
            {translations.changeNow}
          </Button>
        </form>
      </Form>
    </div>
  )
}
