'use client'
import * as React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { UpdateImage } from '@/components/myShop/update-image'
import { useEffect, useState } from 'react'
import { getUser } from '@/lib/useraction'
import { ProductImageCarouselProps } from '@/lib/types'

export function ProductImageCarousel(props: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isOwner, setIsOwner] = useState(false)
  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    const checkUser = async () => {
      const result = await getUser()
      const user = result?.[0]
      if (user?.id == props.sellerId) {
        setIsOwner(true)
      }
    }
    checkUser()
  }, [props.sellerId])

  return (
    <div className={props.className}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="h-full w-[90vw] lg:h-[60vh] lg:w-[50vw] xl:w-[60vh] 2xl:w-[70vh]"
      >
        <CarouselContent>
          {props.images.map((img: string, index: number) => (
            <CarouselItem key={`ci-${index}`}>
              <Card className="h-fit w-fit">
                <CardContent className=" p-0">
                  {img ? (
                    <Image
                      width={500}
                      height={500}
                      src={img} //"/test_img.jpg"
                      alt="Product Image"
                      className="aspect-square h-[50vh] w-[90vw] rounded-xl object-cover lg:h-[60vh] lg:w-[50vw] xl:w-[60vh] 2xl:w-[70vh]"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      className={`-mr-1 flex h-[50vh] w-[90vw] items-center justify-center lg:h-[60vh] lg:w-[50vw] xl:w-[60vh] 2xl:w-[70vh]`}
                    >
                      <div>Placeholder Image</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {props.images.length > 1 && (
          <>
            <CarouselPrevious className="left-3 top-[90%] bg-white/50 xl:-left-12 xl:top-1/2" />
            <CarouselNext className="right-3 top-[90%] bg-white/50 xl:-right-12 xl:top-1/2" />
          </>
        )}
      </Carousel>
      <div className=" hidden flex-row justify-between p-2 text-sm text-muted-foreground lg:flex">
        {props.translations.image} {current} {props.translations.of} {props.images.length}
        {isOwner && <UpdateImage existingImageUrl={props.images[current - 1]} />}
      </div>
    </div>
  )
}
