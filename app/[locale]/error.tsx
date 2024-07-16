/**
 * Renders an error page with a message, a reload button, and an optional "more info" dialog that displays the error message and stack trace.
 *
 * @param error - The error object, which may contain a `digest` property.
 * @param reset - A function to reset the error state and potentially reload the page.
 * @returns A React component that renders the error page.
 */
'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mt-20 flex flex-col items-center gap-2">
      <h1 className="text-xl font-bold">Irgendwas ist schiefgelaufen!</h1>
      <p className="mb-5 text-center text-neutral-500">
        Bitte versuche die Seite neuzuladen oder kehre zum Entdecken screen
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Neu laden</Button>
        <Button>Entdecken</Button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">more info</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Error</DialogTitle>
              <DialogDescription>Keine Sorge, dass sehen nur wir Entwickler</DialogDescription>
            </DialogHeader>
            <div>
              <p className='text-sm'>Error Message: {error.message}</p>
              <p className='text-[8px]'>Stack: {error.stack}</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
