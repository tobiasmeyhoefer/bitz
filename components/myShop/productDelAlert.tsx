/**
 * A React component that renders a product deletion alert dialog.
 *
 * The `ProdDelAlert` component provides a dropdown menu with a "Delete" option that, when clicked, opens an alert dialog to confirm the deletion of a product. The component takes in several props to customize the dialog's content and behavior.
 *
 * @param {string} productId - The ID of the product to be deleted.
 * @param {string} title - The title of the alert dialog.
 * @param {string} yousure - The description text in the alert dialog.
 * @param {string} cancel - The text for the "Cancel" button in the alert dialog.
 * @param {string} confirm - The text for the "Confirm" button in the alert dialog.
 * @param {string} menuDeleteOption - The text for the "Delete" option in the dropdown menu.
 */
// ProdDelAlert.tsx
'use client'
import React, { useState } from 'react'
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
import { deleteProduct } from '@/lib/product-actions'
import { HiDotsVertical } from 'react-icons/hi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ProdDelAlertProps = {
  productId: string
  title: string
  yousure: string
  cancel: string
  confirm: string
  menuDeleteOption: string
}

export function ProdDelAlert({
  productId,
  title,
  yousure,
  cancel,
  confirm,
  menuDeleteOption,
}: ProdDelAlertProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDeleteClick = () => {
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <HiDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleDeleteClick}>{menuDeleteOption}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{yousure}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogClose}>{cancel}</AlertDialogCancel>
            <form action={() => deleteProduct(productId)}>
              <Button variant={'destructive'}>
                <AlertDialogAction className="bg-transparent shadow-none hover:bg-transparent">
                  {confirm}
                </AlertDialogAction>
              </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
