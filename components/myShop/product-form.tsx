'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { addProduct } from '@/lib/productaction'
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Card } from '@/components/ui/card'
import { Button } from '../ui/button'
import { Link, useRouter } from '@/navigation'
import Image from 'next/image'
import { getSignedURL } from '@/lib/productaction'
import { FormTranslations, ProductType } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { getUser } from '@/lib/useraction'
import { FaPencilAlt } from 'react-icons/fa'

const suggestions = [
  { value: 'Reciever' },
  { value: 'Monitor' },
  { value: 'Audio' },
  { value: 'Laptop' },
  { value: 'Headphone' },
  { value: 'Smartphone' },
  { value: 'Tablet' },
  { value: 'Smartwatch' },
  { value: 'Printer' },
  { value: 'Camera' },
  { value: 'Speaker' },
  { value: 'Projector' },
  { value: 'Game Console' },
  { value: 'Drone' },
  { value: 'Router' },
  { value: 'Hard Drive' },
  { value: 'SSD' },
  { value: 'Keyboard' },
  { value: 'Mouse' },
  { value: 'Graphics Card' },
  { value: 'Motherboard' },
  { value: 'RAM' },
  { value: 'Cooling System' },
  { value: 'VR Headset' },
  { value: 'E-Reader' },
  { value: 'Fitness Tracker' },
  { value: 'Charger' },
]

const MAX_FILE_SIZE = 8000000

const minError = 'Eingabe erfordert'
const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: minError })
    .max(50)
    .refine((value) => !/#/.test(value)),
  price: z.coerce.number().safe().positive(),
  isDirectlyBuyable: z.boolean().default(false).optional(),
  description: z
    .string()
    .min(1, { message: minError })
    .max(250)
    .refine((value) => !/#/.test(value)),
  category: z.string().min(1, { message: minError }).max(250),
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
  whichFunction,
  translations,
}: {
  submitText: string
  // action: (values: ProductType) => Promise<void>
  whichFunction: string
  translations: FormTranslations
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [categoryValue, setcategoryValue] = React.useState('')
  const [locationError, setLocationError] = React.useState(false)

  const {
    title,
    description,
    price,
    quantity,
    category,
    categoryPlaceholder,
    images,
    toastTitle,
    toastDescription,
    submitTitle,
  } = translations

  useEffect(() => {
    const getProduct = async () => {
      const result = await getUser()
      const user = result?.[0]
      if (!user?.location) {
        setLocationError(true)
      }
    }
    getProduct()
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      quantity: 1,
      category: '',
      isDirectlyBuyable: true,
      images: null,
    },
  })

  async function onSubmit(values: ProductType) {
    if (compressedFiles?.length === 0) {
      toast({
        title: 'Error',
        description: 'at least one image pls',
      })
      setPreviewUrls(null)
      setFiles(null)
      setCompressedFiles(null)
      return
    }

    if (locationError) {
      setcategoryValue('')
      setPreviewUrls(null)
      setFiles(null)
      setCompressedFiles(null)
      form.reset()
      toast({
        title: 'Error',
        description: 'set Account Location in Settings',
        action: (
          <Button>
            <Link href="/settings">set Location</Link>
          </Button>
        ),
        duration: 2200,
      })
    } else {
      let imageUrls = []
      if (compressedFiles) {
        for (let i = 0; i < compressedFiles.length; i++) {
          if (compressedFiles[i]) {
            const computeSHA256 = async (file: File) => {
              const buffer = await file.arrayBuffer()
              const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
              const hashArray = Array.from(new Uint8Array(hashBuffer))
              const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
              return hashHex
            }
            const signedURLResult = await getSignedURL({
              fileSize: compressedFiles[i].size,
              fileType: compressedFiles[i].type,
              checksum: await computeSHA256(compressedFiles[i]),
            })
            if (signedURLResult.failure !== undefined) {
              console.error(signedURLResult.failure)
              return
            }

            const { url } = signedURLResult.success
            const response = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': compressedFiles[i].type,
              },
              body: compressedFiles[i],
            })
            imageUrls.push(url.split('?')[0])
          }
        }
      }
      // console.log(JSON.parse(JSON.stringify(values)))
      await addProduct(JSON.parse(JSON.stringify(values)), imageUrls)
      router.push('/myshop')
      toast({
        title: toastTitle,
        description: toastDescription,
        duration: 2200,
      })
    }
  }

  const [files, setFiles] = useState<FileList | null>(null)
  const [compressedFiles, setCompressedFiles] = useState<File[] | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? null
    setFiles(files)
    console.log('test')
    console.log(files)
    if (previewUrls) {
      previewUrls.map((url) => URL.revokeObjectURL(url))
    }
    if (files) {
      // const urls = Array.from(files).map((file) => URL.createObjectURL(file))
      // setPreviewUrls(urls)
      const compFiles = await compressImages(Array.from(files))
      const urls2 = compFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls(urls2)
      setCompressedFiles(compFiles)
      // console.log(compFiles[0].size)
      // console.log(files[0].size)
    } else {
      setPreviewUrls(null)
    }
  }

  const handleDelete = async (index: number) => {
    const newPreviewUrls = previewUrls!.filter((_, i) => i !== index)
    setPreviewUrls(newPreviewUrls)

    const filesArray = Array.from(files!)
    // console.log(files)
    filesArray.splice(index, 1)
    const dataTransfer = new DataTransfer()
    filesArray.forEach((file) => dataTransfer.items.add(file))

    const compFiles = await compressImages(Array.from(dataTransfer.files))
    const urlos = compFiles.map((file) => URL.createObjectURL(file))

    setFiles(dataTransfer.files)
    setPreviewUrls(urlos)
    setCompressedFiles(compFiles)

    // @ts-ignore
    form.setValue('images', dataTransfer!.files!)

    // console.log(dataTransfer.files)
    // setFiles(dataTransfer.files)
    // const newFiles = files.filter((_, i) => i !== index)
    // setFiles(newFiles)
  }

  // Funktion zur Bildkomprimierung
  async function compressImages(files: File[]): Promise<File[]> {
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
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
      }),
    )
    return compressedFiles
  }

  return (
    <>
      <Card className="w-full max-w-[800px] p-10">
        {locationError && (
          <div className="flex flex-row items-center gap-2">
            <p className="font-medium text-red-500">Error: Location gotta be set.</p>
            <Button className="h-6 w-12">
              <Link href="/settings">
                <FaPencilAlt />
              </Link>
            </Button>
          </div>
        )}
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{title}</FormLabel>
                  <FormControl>
                    <Input placeholder={title} {...field} />
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
                  <FormLabel> {description}</FormLabel>
                  <FormControl>
                    <Textarea className="h-24" placeholder={description} {...field} />
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
                  <FormLabel className="leading-0">{price}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name={'quantity'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{quantity}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="leading-0">{category}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[30em] justify-between bg-card"
                      >
                        {categoryValue
                          ? suggestions.find((framework) => framework.value === categoryValue)
                              ?.value
                          : categoryPlaceholder}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className=" w-[15em]">
                      <Command>
                        <CommandList>
                          <CommandInput placeholder="Search framework..." />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {suggestions.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue: string) => {
                                  form.setValue('category', framework.value),
                                    setcategoryValue(
                                      currentValue === categoryValue ? '' : currentValue,
                                    )
                                  setOpen(false)
                                }}
                              >
                                <p
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    categoryValue === framework.value ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {framework.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'isDirectlyBuyable'}
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormLabel>is directly buyable</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
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
                  <FormLabel>{images}</FormLabel>
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
                {previewUrls.map((url, index) => (
                  <div className="relative" key={url}>
                    <Image
                      src={url}
                      key={url}
                      alt="Selected files"
                      width={150}
                      height={150}
                      className="border"
                    />
                    <Button
                      className="absolute bottom-1 right-1"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button className="mt-4 border-2" type="submit">
              {submitTitle}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  )
}
