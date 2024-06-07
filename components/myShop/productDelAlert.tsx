'use client'
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
import { FaTrash } from 'react-icons/fa'
import { deleteProduct } from '@/lib/productaction'
// import { useTranslations } from "next-intl";

export function ProdDelAlert({ productId }: { productId: string }) {
  //const t = useTranslations();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <FaTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sicher?</AlertDialogTitle>
          <AlertDialogDescription>
            GANZ SICHER?! Produkt Löschen ?{/* {t('submitTitle')} */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={() => deleteProduct(productId)}>
            <Button variant={'destructive'}>
              <AlertDialogAction className="bg-transparent hover:bg-transparent">
                Delete
              </AlertDialogAction>
            </Button>
          </form>
          {/* <AlertDialogAction onClick={() => deleteProduct(productId)}>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
