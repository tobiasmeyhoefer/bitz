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
import Image from 'next/image'

export function ProductImageCarousel(props: any) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className={props.className}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="h-[50vh] w-[90vw] lg:h-[60vh] lg:w-[50vw] xl:w-[60vh] 2xl:w-[70vh]"
      >
        <CarouselContent>
          {props.images.map((img: string, index: number) => (
            <CarouselItem key={`ci-${index}`}>
              <Card className="h-fit w-fit">
                <CardContent className="p-0">
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
      <div className="hidden py-2 text-sm text-muted-foreground lg:block">
        {props.translations.image} {current} {props.translations.of} {props.images.length}
      </div>
    </div>
  )
}
