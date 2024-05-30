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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { FaTrash } from 'react-icons/fa';
import { deleteProduct } from "@/lib/productaction";
import { useEffect, useState } from "react";
// import { useTranslations } from "next-intl";


export function ProdDelAlert({ productId }: { productId: string })  {
  //const t = useTranslations();
    const [isOpen, setIsOpen] = useState(true)
    useEffect(() => {
    if (!isOpen) {
      // Hier können Sie eine Funktion ausführen, wenn das Popup geschlossen wird
      // Zum Beispiel können Sie die Seite aktualisieren
      window.location.reload()
    }
    }, [isOpen])
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><FaTrash /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sicher?</AlertDialogTitle>
          <AlertDialogDescription>
GANZ SICHER?! Produkt Löschen ?
{/* {t('submitTitle')} */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProduct(productId)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

