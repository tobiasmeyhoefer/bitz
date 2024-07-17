/**
 * The `ProductForm` component is a React component that renders a form for creating a new product. It uses the `react-hook-form` library to handle form state and validation, and the `zod` library to define the form schema.
 *
 * The component accepts the following props:
 * - `submitText`: a string that represents the text to display on the submit button
 * - `whichFunction`: a string that represents the function to be called when the form is submitted
 * - `translations`: an object that contains translations for various form elements
 *
 * The component handles file uploads, image compression, and form submission. It also checks for profanity in the product title and description, and verifies that the user's phone number is verified before allowing the form to be submitted.
 *
 * The component also includes a category selection dropdown, which uses the `Popover` and `Command` components from the `@/components/ui/command` module.
 */
'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { addProduct, checkProfanity } from '@/lib/product-actions'
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
import { getSignedURL } from '@/lib/product-actions'
import { FormTranslations } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Checkbox } from '../ui/checkbox'
import { getUser } from '@/lib/user-actions'
import { checkIfUserIsPhoneVerified } from '@/lib/verify-actions'
import { LoadingButton } from '@/components/ui/button'

const suggestions = [
  { value: 'Audio' },
  { value: 'Beamer' },
  { value: 'Bluetooth Speaker' },
  { value: 'Blu-ray Player' },
  { value: 'Camera' },
  { value: 'Charger' },
  { value: 'Cooling System' },
  { value: 'CPU' },
  { value: 'Dashcam' },
  { value: 'Desktop PC' },
  { value: 'Digital Frame' },
  { value: 'DJ Equipment' },
  { value: 'Drone' },
  { value: 'E-Reader' },
  { value: 'External Sound Card' },
  { value: 'Fitness Tracker' },
  { value: 'Game Console' },
  { value: 'Gaming Chair' },
  { value: 'Gaming Controller' },
  { value: 'Graphics Card' },
  { value: 'Hard Drive' },
  { value: 'Headphone' },
  { value: 'Home Theater' },
  { value: 'Keyboard' },
  { value: 'Laptop' },
  { value: 'Lighting' },
  { value: 'Microphone' },
  { value: 'Monitor' },
  { value: 'Motherboard' },
  { value: 'Mouse' },
  { value: 'Network Switch' },
  { value: 'Notebook' },
  { value: 'Power Supply' },
  { value: 'Printer' },
  { value: 'Projector' },
  { value: 'RAM' },
  { value: 'Receiver' },
  { value: 'Router' },
  { value: 'Scanner' },
  { value: 'Smart Doorbell' },
  { value: 'Smart Home Hub' },
  { value: 'Smart Lock' },
  { value: 'Smart Plug' },
  { value: 'Smart Speaker' },
  { value: 'Smart Thermostat' },
  { value: 'Smartphone' },
  { value: 'Smartwatch' },
  { value: 'Soundbar' },
  { value: 'SSD' },
  { value: 'Streaming Device' },
  { value: 'Tablet' },
  { value: 'TV' },
  { value: 'UPS' },
  { value: 'VR Headset' },
  { value: 'Walkie Talkie' },
  { value: 'Weather Station' },
  { value: 'Webcam' },
  { value: 'WiFi Extender' },
  { value: 'WiFi Router' },
  { value: 'Wireless Charger' },
  { value: 'Wireless Earbuds' },
  { value: 'Workstation' },
  { value: 'Other' },
]

const MAX_FILE_SIZE = 8000000

const minError = 'Eingabe erfordert'
//define the schema and its validation rules
const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: minError })
    .max(50)
    .refine((value) => !/#/.test(value)),
  price: z.coerce
    .number()
    .safe()
    .positive()
    .multipleOf(1, { message: 'Dezimalstellen sind nicht erwünscht' }),
  isDirectlyBuyable: z.boolean().default(false).optional(),
  description: z
    .string()
    .min(1, { message: minError })
    .max(250)
    .refine((value) => !/#/.test(value)),
  category: z.string().min(1, { message: minError }).max(250).optional().default('Other'),
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
  whichFunction,
  translations,
}: {
  submitText: string
  whichFunction: string
  translations: FormTranslations
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [categoryValue, setcategoryValue] = React.useState('')
  const [locationError, setLocationError] = React.useState(false)
  const [locationErrorMessage, setLocationErrorMessage] = React.useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    title,
    description,
    price,
    category,
    categoryPlaceholder,
    images,
    toastTitle,
    toastDescription,
    submitTitle,
    isDirectlyBuyable,
    deletePicture,
  } = translations

  const onClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 12000)
  }

  useEffect(() => {
    const getProduct = async () => {
      const user = await getUser()
      if (!user.location && !user.adress) {
        setLocationError(true)
        setLocationErrorMessage('Location & Adress gotta be set.')
      } else if (!user.location) {
        setLocationError(true)
        setLocationErrorMessage('Location gotta be set.')
      } else if (!user.adress) {
        setLocationError(true)
        setLocationErrorMessage('Address gotta be set.')
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
      category: 'Other',
      isDirectlyBuyable: true,
      images: null,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const isPhoneVerified = await checkIfUserIsPhoneVerified()
    if (!isPhoneVerified) {
      toast({
        title: 'Error',
        description: 'Please verify your phone number first',
        duration: 2000,
      })
      setIsLoading(false)
      return
    }

    if ((await checkProfanity(values.title)) || (await checkProfanity(values.description))) {
      toast({
        title: 'Oh oh',
        description: 'Please check your profanity',
        duration: 2000,
      })
      setIsLoading(false)
      return
    }

    await checkProfanity(values.title)
    await checkProfanity(values.description)

    if (!values.category) {
      values.category = 'Other'
    }

    if (compressedFiles?.length === 0) {
      toast({
        title: 'Error',
        description: 'at least one image pls',
        duration: 2000,
      })
      setPreviewUrls(null)
      setFiles(null)
      setCompressedFiles(null)
      setIsLoading(false)
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
        description: locationErrorMessage,
        action: (
          <Link href="/settings">
            <Button>go to Settings</Button>
          </Link>
        ),
        duration: 2000,
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
              setIsLoading(false)
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
      await addProduct(JSON.parse(JSON.stringify(values)), imageUrls)
      document.getElementById('closeDialog')?.click()
      setIsLoading(false)
      router.push('/my-shop')
      toast({
        title: toastTitle,
        description: toastDescription,
        duration: 2000,
      })
    }
  }

  const [files, setFiles] = useState<FileList | null>(null)
  const [compressedFiles, setCompressedFiles] = useState<File[] | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[] | null>(null)
  const [charsRemaining, setCharsRemaining] = useState(500)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? null
    setFiles(files)
    if (previewUrls) {
      previewUrls.map((url) => URL.revokeObjectURL(url))
    }
    if (files) {
      const compFiles = await compressImages(Array.from(files))
      const urls2 = compFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls(urls2)
      setCompressedFiles(compFiles)
    } else {
      setPreviewUrls(null)
    }
  }

  const handleDelete = async (index: number) => {
    const newPreviewUrls = previewUrls!.filter((_, i) => i !== index)
    setPreviewUrls(newPreviewUrls)

    const filesArray = Array.from(files!)
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
    <Card className="p-6 h-fit md:p-10 border-none shadow-none">
      <h2 className="mb-6 text-2xl font-bold">Produkt hinzufügen</h2>
      {locationError && (
        <div className="mb-2 flex flex-row items-center gap-2">
          <p className="font-medium text-red-400">Error: Location not set</p>
          <Link href="/settings">
            <Button className="h-6 w-12">edit</Button>
          </Link>
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
                  <Textarea
                    placeholder="Description"
                    {...field}
                    maxLength={500}
                    onChange={(event) => {
                      const value = event.target.value
                      field.onChange(value)
                      setCharsRemaining(500 - value.length)
                    }}
                  />
                </FormControl>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                  {charsRemaining} Remaining characters
                </p>
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
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="price" {...field} />
                    <p className="text-lg">€</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      className="w-full justify-between bg-card"
                    >
                      {categoryValue
                        ? suggestions.find((framework) => framework.value === categoryValue)?.value
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                <FormLabel>{isDirectlyBuyable}</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
                  <Button className="absolute bottom-1 right-1" onClick={() => handleDelete(index)}>
                    {deletePicture}
                  </Button>
                </div>
              ))}
            </div>
          )}
          {isLoading ? (
            <LoadingButton loading={isLoading} onClick={onClick} className="mt-4 max-md:mb-6">
              {submitTitle}
            </LoadingButton>
          ) : (
            <Button className="mt-4 max-md:mb-6" type="submit">
              {submitTitle}
            </Button>
          )}
        </form>
      </Form>
    </Card>
  )
}
