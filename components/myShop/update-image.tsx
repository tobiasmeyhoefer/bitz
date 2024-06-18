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

export function UpdateImage(props: { existingImageUrl: string }) {
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
        <Button className="h-7 p-1 md:h-9 md:w-36 md:p-4">
           
          <FaPencilAlt className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product-Picture</DialogTitle>
          <Image
            width={100}
            height={100}
            src={props.existingImageUrl} //"/test_img.jpg"
            alt="Product Image"
            style={{ objectFit: 'cover' }}
          />
          <DialogDescription>edit this Picture</DialogDescription>
        </DialogHeader>
        <PictureChanger title={''} submitTitle={'submit'} action={handleImageUpdate} />
        <DialogFooter className="absolute right-1 top-1 ">
          <Button variant="outline" onClick={close}>
            X
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
