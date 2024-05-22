'use client'
import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function ProductImageCarousel(props: any) {
  //     <Carousel
  //       className={cn('w-full max-w-lg', props.className)}
  //       opts={{
  //         loop: true,
  //       }}
  //       orientation="vertical"
  //     >
  //       <CarouselContent className="-ml-1">
  //         {Array.from({ length: 5 }).map((_, index) => (
  //           <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
  //             <div className="p-1">
  //               <Card>
  //                 <CardContent className="flex aspect-square items-center justify-center p-6">
  //                   <span className="text-2xl font-semibold">{index + 1}</span>
  //                 </CardContent>
  //               </Card>
  //             </div>
  //           </CarouselItem>
  //         ))}
  //       </CarouselContent>
  //       <CarouselPrevious />
  //       <CarouselNext />
  //     </Carousel>
  //     <Carousel
  //       opts={{
  //         align: 'start',
  //       }}
  //       orientation="vertical"
  //       className="w-full max-w-xs"
  //     >
  //       <CarouselContent className="-mt-1 h-[280px]">
  //         {Array.from({ length: 5 }).map((_, index) => (
  //           <CarouselItem key={index} className="">
  //             <Card className="">
  //               <CardContent className="p-0">
  //                 <Image
  //                   width={400}
  //                   height={400}
  //                   src="/test_img.jpg"
  //                   alt="Product Image"
  //                   className="rounded-xl "
  //                 />
  //               </CardContent>
  //             </Card>
  //           </CarouselItem>
  //         ))}
  //       </CarouselContent>
  //       <CarouselPrevious />
  //       <CarouselNext />
  //     </Carousel>
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="h-full">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className=" h-full w-[40vh]  md:h-[50vh] md:w-[50vh]  lg:w-[60vh]  xl:w-[70vh]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="h-fit w-fit">
                <CardContent className="p-0">
                  <Image
                    width={500}
                    height={500}
                    src="/test_img.jpg"
                    alt="Product Image"
                    className="aspect-square h-full w-[40vh] rounded-xl object-cover md:h-[50vh] md:w-[50vh] lg:w-[60vh] xl:w-[70vh]"
                    style={{ objectFit: 'cover' }}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  )
}
