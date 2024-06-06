'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { acceptDealTime, acceptOffer, declineOffer } from '@/lib/conversations-actions'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  message: z
    .string()
    .min(20, { message: 'Der Käufer braucht einen Zeitraum zur Abholung' })
    .max(200, {
      message: 'Es sind maximal 200 Zeichen erlaubt',
    }),
})

export function ConversationForm2({ convId }: { convId: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await acceptDealTime(convId, values.message)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Answer</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. today evening fits good for me" {...field} />
              </FormControl>
              <FormDescription>Find an agreement with the seller</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit">Absenden</Button>
          <AlertDialog>
            <AlertDialogTrigger>Deal abbrechen</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently decline this offer
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => declineOffer(convId)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  )
}
