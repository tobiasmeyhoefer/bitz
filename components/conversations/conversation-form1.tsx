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
import { Input } from '@/components/ui/input'
import { acceptOffer, declineOffer } from '@/lib/conversations-actions'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  message: z
    .string()
    .min(20, { message: 'Der Käufer braucht einen Zeitraum zur Abholung' })
    .max(200, {
      message: 'Es sind maximal 200 Zeichen erlaubt',
    }),
})

export function ConversationForm({ convId }: { convId: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await acceptOffer(convId, values.message)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. Hey! Im home today until 7 o clock" {...field} />
              </FormControl>
              <FormDescription>
                Specify some crucial information like pick up date in a small message
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button className="bg-border hover:bg-input " type="submit">
            Annehmen
          </Button>
          <AlertDialog>
            <AlertDialogTrigger className="w-28 rounded-md bg-border text-sm font-medium hover:bg-[#593f44]">
              Ablehnen
            </AlertDialogTrigger>
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
          {/* <Button variant={'destructive'}>Ablehnen</Button> */}
        </div>
      </form>
    </Form>
  )
}
