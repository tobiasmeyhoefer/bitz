/**
 * A React component that provides a dialog for updating the image of a product.
 *
 * @param props - An object containing the following properties:
 *   - `existingImageUrl`: The URL of the existing product image.
 *   - `translations`: An object containing localized strings for the dialog's title, description, submit button, and close button.
*/

'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FaPencilAlt } from 'react-icons/fa'
import PictureChanger from '../settings/picture-changer'
import { updateProductImage } from '@/lib/product-actions'
import Image from 'next/image'
import { useToast } from '@/components/ui/use-toast'
export function UpdateImage(props: {
  existingImageUrl: string
  translations: { title: string; description: string; submit: string; close: string }
}) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  function close() {
    setOpen(false)
  }

  async function handleImageUpdate(newImageUrl: string) {
    await updateProductImage(props.existingImageUrl, newImageUrl)
    toast({
      title: 'Success',
      description: 'changed Image',
      duration: 2000,
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-7 w-20 p-1 md:h-9 md:p-4 lg:w-36">
          <FaPencilAlt className="" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.translations.title}</DialogTitle>
          <Image
            width={100}
            height={100}
            src={props.existingImageUrl} //"/test_img.jpg"
            alt="Product Image"
            style={{ objectFit: 'cover' }}
          />
          <DialogDescription>{props.translations.description}</DialogDescription>
        </DialogHeader>
        <PictureChanger
          title={''}
          submitTitle={props.translations.submit}
          action={handleImageUpdate}
        />
        <DialogFooter className="absolute right-1 top-1 ">
          <Button variant="outline" onClick={close}>
            X
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
