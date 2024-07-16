/**
 * A button component that triggers an alert dialog to confirm deleting the user's account.
 *
 * @param header - The text to display in the button that triggers the alert dialog.
 * @param title - The title of the alert dialog.
 * @param description - The description text to display in the alert dialog.
 * @param cancel - The text to display on the cancel button in the alert dialog.
 * @param action - The text to display on the action button in the alert dialog.
 * @returns A React component that renders the delete account button and alert dialog.
 */
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
import { deleteAccount } from '@/lib/user-actions'

export function DeleteAccountButton({
  header,
  title,
  description,
  cancel,
  action,
}: {
  header: string
  title: string
  description: string
  cancel: string
  action: string
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{header}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <form action={deleteAccount}>
            <Button variant={'destructive'}>
              <AlertDialogAction className="bg-transparent shadow-none hover:bg-transparent">
                {action}
              </AlertDialogAction>
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
