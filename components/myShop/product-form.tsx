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

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const MAX_FILE_SIZE = 4000000

const minError = 'Eingabe erfordert'
const formSchema = z.object({
  title: z.string().min(1, { message: minError }).max(50),
  price: z.coerce.number().safe().positive(),
  quantity: z.coerce.number().safe().positive(),
  // location: z.string().min(1, { message: minError }).max(50),
  // status: z.string().min(1, { message: minError }).max(50),
  // currency: z
  //   .string()
  //   .min(1, { message: minError })
  //   .max(30)
  //   .refine((value) => typeof value === 'string' && !/^\d+$/.test(value)),
  description: z.string().min(1, { message: minError }).max(250),
  // images: z
  //   .any()
  //   // To not allow empty files
  //   .refine((files) => files?.length >= 1 && files?.length <= 5, {
  //     message: 'There are 1-5 Images allowed',
  //   })
  //   // To not allow files other than images
  //   .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
  //     message: '.jpg, .jpeg, .png and .webp files are accepted.',
  //   })
  //   // To not allow files larger than 5MB
  //   .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
  //     message: `Max file size is 4MB.`,
  //   }),
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
  const [data, setData] = useState<ProductType>({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  })

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (whichFunction == 'update') {
          const result = await getProductById('3f4cb90e-6819-4c65-925b-9e563fdf9aae')
          const r = result[0]
          const updatedData: ProductType = {
            title: r.title,
            description: r.description || '',
            price: r.price,
            quantity: r.quantity,
          }
          setData(updatedData)
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error)
      }
    }
    getProduct()
  }, [whichFunction])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      quantity: 0,
    },
  })

  useEffect(() => {
    if (data && whichFunction == 'update') {
      form.reset(data)
    }
  }, [data, form, whichFunction])

  async function onSubmit(values: ProductType) {
    // console.log('Test')
    // console.log(files)
    let imageUrls = []
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          // const signedURLResult = await getSignedURL(files[i].name)
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
          console.log({ url })
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': files[i].type,
            },
            body: files[i],
          })
          console.log(response)
          imageUrls.push(url.split('?')[0])
        }
      }
    }
    await addProduct(values, imageUrls)
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel> Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'price'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="price" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name={'currency'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input placeholder="currency" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name={'quantity'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="quantity" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name={'location'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="location" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name={'status'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="status" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <Input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
            {/* <FormField
              control={form.control}
              name={'images'}
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            {/* Die Architektur muss noch auf multiple ausgebaut werden */}
            {/* <Input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            /> */}
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

            {/* {previewUrl && file && (
              <div className="mt-4">
                {file.type.startsWith('image/') ? (
                  <Image
                    src={previewUrl}
                    alt="Selected file"
                    width={150}
                    height={150}
                    className="border"
                  />
                ) : null}
              </div>
            )} */}

            <Button className="mt-4" type="submit">
              {submitText}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  )
}
