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
  menuDeleteOption: string
  productId: string
  title: string
  yousure: string
  cancel: string
  confirm: string
}

export function ProdDelAlert({ productId, title, yousure, cancel, confirm }: ProdDelAlertProps) {

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
          <DropdownMenuItem onClick={handleDeleteClick}>X</DropdownMenuItem>
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
                <AlertDialogAction className="bg-transparent hover:bg-transparent">
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
