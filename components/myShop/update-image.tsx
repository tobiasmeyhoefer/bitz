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
import ProfilePictureChanger from '../settings/profile-picture-changer'
import { updateProductImage } from '@/lib/productaction'

export function UpdateImage(props: { existingImageUrl: string }) {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  async function handleImageUpdate(newImageUrl: string) {
    await updateProductImage(props.existingImageUrl, newImageUrl)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          edit Picture
          <FaPencilAlt className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product-Picture</DialogTitle>
          <DialogDescription>
            Make changes to your Product-Pictur here. Click X when yore done.
          </DialogDescription>
        </DialogHeader>
        <ProfilePictureChanger
          title={'hallo'}
          submitTitle={'abschicken'}
          action={handleImageUpdate}
        />
        <DialogFooter>
          <Button onClick={close}>X</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
