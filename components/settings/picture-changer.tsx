'use client'
import { getSignedURL } from '@/lib/productaction'
import { z } from 'zod'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { changeUserImage } from '@/lib/useraction'
const MAX_FILE_SIZE = 8000000
const formSchema = z.object({
  image: z.any().refine(
    (file) => {
      return file.size <= MAX_FILE_SIZE
    },
    {
      message: 'File must be smaller than 8MB',
    },
  ),
})

export default function PictureChanger({
  title,
  submitTitle,
  action,
}: {
  title: string
  submitTitle: string
  action: (url: string) => Promise<void>
}) {
  const [file, setFile] = useState<File | null>(null)
  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
    },
  })

  async function onSubmit(values: any) {
    let imageUrl = ''
    if (compressedFile) {
      const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer()
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        return hashHex
      }
      const signedURLResult = await getSignedURL({
        fileSize: compressedFile.size,
        fileType: compressedFile.type,
        checksum: await computeSHA256(compressedFile),
      })
      if (signedURLResult.failure !== undefined) {
        console.error(signedURLResult.failure)
        return
      }

      const { url } = signedURLResult.success
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': compressedFile.type,
        },
        body: compressedFile,
      })
      imageUrl = url.split('?')[0]
    }
    await action(imageUrl)
    setPreviewUrl(null)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFile(file)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    if (file) {
      const compFile = await compressImage(file)
      const url = URL.createObjectURL(compFile)
      setPreviewUrl(url)
      setCompressedFile(compFile)
    } else {
      setPreviewUrl(null)
    }
  }

  // Funktion zur Bildkomprimierung
  async function compressImage(file: File): Promise<File> {
    const imageBitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Setze die gewünschte Breite und Höhe für das quadratische Format
    const MAX_DIMENSION = 800
    canvas.width = MAX_DIMENSION
    canvas.height = MAX_DIMENSION

    // Berechne die neue Größe und Position für das 1:1-Format
    const aspectRatio = imageBitmap.width / imageBitmap.height
    let sourceX = 0
    let sourceY = 0
    let sourceWidth = imageBitmap.width
    let sourceHeight = imageBitmap.height

    if (aspectRatio > 1) {
      // Landscape
      sourceX = (imageBitmap.width - imageBitmap.height) / 2
      sourceWidth = imageBitmap.height
    } else if (aspectRatio < 1) {
      // Portrait
      sourceY = (imageBitmap.height - imageBitmap.width) / 2
      sourceHeight = imageBitmap.width
    }

    ctx!.drawImage(
      imageBitmap,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      MAX_DIMENSION,
      MAX_DIMENSION,
    )

    // Konvertiere das Canvas-Bild in einen Blob
    return new Promise<File>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }))
          }
        },
        file.type,
        0.8,
      ) // 0.8 ist die Qualitätsstufe, 0.8 bedeutet 80% Qualität
    })
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>{title}</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => {
                      onChange(event.target.files![0])
                      handleFileChange(event)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {previewUrl && file && (
            <div className="flex flex-wrap">
              <Image
                src={previewUrl}
                key={previewUrl}
                alt="Selected files"
                width={150}
                height={150}
                className="border"
              />
            </div>
          )}
          <Button className="mt-4 border-2" type="submit">
            {submitTitle}
          </Button>
        </form>
      </Form>
    </>
  )
}
