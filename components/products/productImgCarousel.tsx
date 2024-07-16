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
import { getUser } from '@/lib/user-actions'
import { auth } from '@/auth'
import { CardContainer } from '@/components/ui/3d-card'

export function ProductImageCarousel(props: {
  translations: {
    image: string
    of: string
    updateImage: {
      title: string
      description: string
      submit: string
      close: string
    }
  }
  images: (string | null)[]
  className: string
  sellerId: string
}) {
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
      const user = await getUser()
      if (user.id == props.sellerId) {
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
        className="flex h-full w-[90vw] justify-center lg:h-[70vh] lg:w-[70vh]"
      >
        <CarouselContent>
          {props.images.map((img: string | null, index: number) => (
            <CarouselItem key={`ci-${index}`}>
              {/* <CardContainer> */}
              <Card className="h-fit w-fit">
                <CardContent className=" p-0">
                  {img ? (
                    <Image
                      width={500}
                      height={500}
                      src={img} //"/test_img.jpg"
                      alt="Product Image"
                      className="aspect-square h-[90vw] w-[90vw] rounded-xl object-cover md:h-[50vw] md:w-[50vw] lg:h-[70vh] lg:w-[70vh]"
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
              {/* </CardContainer> */}
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
      <div className="z-50 flex flex-row justify-between p-2 text-sm text-muted-foreground">
        {props.translations.image} {current} {props.translations.of} {props.images.length}
        {isOwner && props.images[current - 1] && (
          <UpdateImage
            existingImageUrl={props.images[current - 1]!}
            translations={props.translations.updateImage}
          />
        )}
      </div>
    </div>
  )
}
