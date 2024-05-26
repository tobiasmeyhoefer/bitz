// 'use client'
// import { getSignedURL } from '@/lib/productaction'
// import { ProductType } from '@/lib/types'
// import { z } from 'zod'
// import Image from 'next/image'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { useState } from 'react'
// import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
// import { Input } from '../ui/input'
// const MAX_FILE_SIZE = 8000000
// const formSchema = z.object({
//   images: z
//     .any()
//     .refine(
//       (files) => {
//         return files?.length >= 1 && files?.length <= 5
//       },
//       {
//         message: 'There are 1-5 Images allowed',
//       },
//     )
//     .refine(
//       (files) => {
//         // console.log(files)
//         if (files instanceof FileList) {
//           const filesArray = Array.from(files)
//           return filesArray.every((file) => file.size <= MAX_FILE_SIZE)
//         }

//         if (files instanceof File) {
//           return files.size <= MAX_FILE_SIZE
//         }
//       },
//       {
//         message: 'Each file must be no larger than 8MB',
//       },
//     ),
// })

// export default function ProfilePictureChanger() {
//   const [files, setFiles] = useState<FileList | null>(null)
//   const [compressedFiles, setCompressedFiles] = useState<File[] | null>(null)
//   const [previewUrls, setPreviewUrls] = useState<string[] | null>(null)
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     mode: 'onChange',
//   })

//   async function onSubmit(values: ProductType) {
//     let imageUrls = []
//     if (compressedFiles) {
//       for (let i = 0; i < compressedFiles.length; i++) {
//         if (compressedFiles[i]) {
//           const computeSHA256 = async (file: File) => {
//             const buffer = await file.arrayBuffer()
//             const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
//             const hashArray = Array.from(new Uint8Array(hashBuffer))
//             const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
//             return hashHex
//           }
//           const signedURLResult = await getSignedURL({
//             fileSize: compressedFiles[i].size,
//             fileType: compressedFiles[i].type,
//             checksum: await computeSHA256(compressedFiles[i]),
//           })
//           if (signedURLResult.failure !== undefined) {
//             console.error(signedURLResult.failure)
//             return
//           }

//           const { url } = signedURLResult.success
//           const response = await fetch(url, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': compressedFiles[i].type,
//             },
//             body: compressedFiles[i],
//           })
//           imageUrls.push(url.split('?')[0])
//         }
//       }
//     }
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files ?? null
//     setFiles(files)
//     if (previewUrls) {
//       previewUrls.map((url) => URL.revokeObjectURL(url))
//     }
//     if (files) {
//       // const urls = Array.from(files).map((file) => URL.createObjectURL(file))
//       // setPreviewUrls(urls)
//       const compFiles = await compressImages(Array.from(files))
//       const urls2 = compFiles.map((file) => URL.createObjectURL(file))
//       setPreviewUrls(urls2)
//       setCompressedFiles(compFiles)
//       // console.log(compFiles[0].size)
//       // console.log(files[0].size)
//     } else {
//       setPreviewUrls(null)
//     }
//   }

//   // Funktion zur Bildkomprimierung
//   async function compressImages(files: File[]): Promise<File[]> {
//     const compressedFiles = await Promise.all(
//       files.map(async (file) => {
//         const imageBitmap = await createImageBitmap(file)
//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d')

//         // Setze die gewünschte Breite und Höhe für das quadratische Format
//         const MAX_DIMENSION = 800
//         canvas.width = MAX_DIMENSION
//         canvas.height = MAX_DIMENSION

//         // Berechne die neue Größe und Position für das 1:1-Format
//         const aspectRatio = imageBitmap.width / imageBitmap.height
//         let sourceX = 0
//         let sourceY = 0
//         let sourceWidth = imageBitmap.width
//         let sourceHeight = imageBitmap.height

//         if (aspectRatio > 1) {
//           // Landscape
//           sourceX = (imageBitmap.width - imageBitmap.height) / 2
//           sourceWidth = imageBitmap.height
//         } else if (aspectRatio < 1) {
//           // Portrait
//           sourceY = (imageBitmap.height - imageBitmap.width) / 2
//           sourceHeight = imageBitmap.width
//         }

//         ctx!.drawImage(
//           imageBitmap,
//           sourceX,
//           sourceY,
//           sourceWidth,
//           sourceHeight,
//           0,
//           0,
//           MAX_DIMENSION,
//           MAX_DIMENSION,
//         )

//         // Konvertiere das Canvas-Bild in einen Blob
//         return new Promise<File>((resolve) => {
//           canvas.toBlob(
//             (blob) => {
//               if (blob) {
//                 resolve(new File([blob], file.name, { type: file.type }))
//               }
//             },
//             file.type,
//             0.8,
//           ) // 0.8 ist die Qualitätsstufe, 0.8 bedeutet 80% Qualität
//         })
//       }),
//     )
//     return compressedFiles
//   }

//   return (
//     <>
//       <Form {...form}>
//         <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
//           <FormField
//             control={form.control}
//             name="images"
//             render={({ field: { value, onChange, ...fieldProps } }) => (
//               <FormItem>
//                 <FormLabel>{images}</FormLabel>
//                 <FormControl>
//                   <Input
//                     {...fieldProps}
//                     multiple
//                     type="file"
//                     accept="image/jpeg,image/png,image/webp"
//                     onChange={(event) => {
//                       onChange(event.target.files)
//                       // onChange(event.target.files && event.target.files[0])
//                       handleFileChange(event)
//                     }}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           {previewUrls && files && (
//             <div className="flex flex-wrap">
//               {previewUrls.map((url) => (
//                 <Image
//                   src={url}
//                   key={url}
//                   alt="Selected files"
//                   width={150}
//                   height={150}
//                   className="border"
//                 />
//               ))}
//             </div>
//           )}
//           <Button className="mt-4 border-2" type="submit">
//             {submitTitle}
//           </Button>
//         </form>
//       </Form>
//     </>
//   )
// }
