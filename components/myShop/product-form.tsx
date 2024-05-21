'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { addProduct, getProductById } from '@/lib/productaction'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { Button } from '../ui/button'
import { useRouter } from '@/navigation'
import Image from 'next/image'
import { getSignedURL } from '@/lib/productaction'
import { ProductType } from '@/lib/types'

const MAX_FILE_SIZE = 8000000

const minError = 'Eingabe erfordert'
const formSchema = z.object({
  title: z.string().min(1, { message: minError }).max(50),
  price: z.coerce.number().safe().positive(),
  quantity: z.coerce.number().safe().positive(),
  description: z.string().min(1, { message: minError }).max(250),
  images: z
    .any()
    .refine(
      (files) => {
        return files?.length >= 1 && files?.length <= 5
      },
      {
        message: 'There are 1-5 Images allowed',
      },
    )
    .refine(
      (files) => {
        // console.log(files)
        if (files instanceof FileList) {
          const filesArray = Array.from(files)
          return filesArray.every((file) => file.size <= MAX_FILE_SIZE)
        }

        if (files instanceof File) {
          return files.size <= MAX_FILE_SIZE
        }
      },
      {
        message: 'Each file must be no larger than 8MB',
      },
    ),
})

export function ProductForm({
  submitText,
  // action,
  userLocation,
  whichFunction,
}: {
  submitText: string
  // action: (values: ProductType) => Promise<void>
  userLocation: string
  whichFunction: string
}) {
  const router = useRouter()
  //muss eventuell um Image url oder so ersetzt werden
  // const [data, setData] = useState<ProductType>({
  //   title: '',
  //   description: '',
  //   price: 0,
  //   quantity: 0,
  // })

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       if (whichFunction == 'update') {
  //         const result = await getProductById('3f4cb90e-6819-4c65-925b-9e563fdf9aae')
  //         const r = result[0]
  //         const updatedData: ProductType = {
  //           title: r.title,
  //           description: r.description || '',
  //           price: r.price,
  //           quantity: r.quantity,
  //         }
  //         setData(updatedData)
  //       }
  //     } catch (error) {
  //       console.error('Fehler beim Laden der Daten:', error)
  //     }
  //   }
  //   getProduct()
  // }, [whichFunction])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      quantity: 1,
      images: null,
    },
  })

  // useEffect(() => {
  //   if (data && whichFunction == 'update') {
  //     form.reset(data)
  //   }
  // }, [data, form, whichFunction])

  async function onSubmit(values: ProductType) {
    let imageUrls = []
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          const computeSHA256 = async (file: File) => {
            const buffer = await file.arrayBuffer()
            const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
            return hashHex
          }
          const signedURLResult = await getSignedURL({
            fileSize: files[i].size,
            fileType: files[i].type,
            checksum: await computeSHA256(files[i]),
          })
          if (signedURLResult.failure !== undefined) {
            console.error(signedURLResult.failure)
            return
          }

          const { url } = signedURLResult.success
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': files[i].type,
            },
            body: files[i],
          })
          imageUrls.push(url.split('?')[0])
        }
      }
    }
    // console.log(JSON.parse(JSON.stringify(values)))
    await addProduct(JSON.parse(JSON.stringify(values)), imageUrls)
    router.push('/myshop')
  }

  const [files, setFiles] = useState<FileList | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? null
    setFiles(files)
    if (previewUrls) {
      previewUrls.map((url) => URL.revokeObjectURL(url))
    }
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file))
      setPreviewUrls(urls)
    } else {
      setPreviewUrls(null)
    }
  }

  return (
    <>
      <Card className="w-[500px] p-10">
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'price'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'quantity'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      multiple
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) => {
                        onChange(event.target.files)
                        // onChange(event.target.files && event.target.files[0])
                        handleFileChange(event)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {previewUrls && files && (
              <div className="flex flex-wrap">
                {previewUrls.map((url) => (
                  <Image
                    src={url}
                    key={url}
                    alt="Selected files"
                    width={150}
                    height={150}
                    className="border"
                  />
                ))}
              </div>
            )}
            <Button className="mt-4" type="submit">
              {submitText}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  )
}
