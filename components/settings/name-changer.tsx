/**
 * A React component that allows the user to change their username.
 *
 * The component uses the `react-hook-form` library to handle form validation and submission.
 * It also uses the `useToast` hook from the custom UI components to display a success message
 * when the username is successfully changed.
 *
 * The component fetches the user's current name from the `getUser` function in the `user-actions`
 * module and pre-populates the input field with this value.
 *
 * When the user submits the form, the `saveUserName` function from the `user-actions` module
 * is called to update the user's name in the backend.
 *
 * @param {NameChangerProps} props - The props for the NameChanger component.
 * @param {object} props.translations - An object containing the translations for the component.
 * @param {string} props.translations.username - The translation for the "Username" label.
 * @param {string} props.translations.changeName - The translation for the "Change Name" label.
 * @param {string} props.translations.changeNow - The translation for the "Change Now" button text.
 * @returns {JSX.Element} - The NameChanger component.
 */
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
          <Button variant={"outline"} className="mt-4" type="submit">
            {translations.changeNow}
          </Button>
        </form>
      </Form>
    </div>
  )
}
