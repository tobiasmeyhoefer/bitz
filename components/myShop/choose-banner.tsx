'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image, { StaticImageData } from 'next/image'
import colorBanner1 from '@/public/images/Banner/cardinal.jpg'
import colorBanner2 from '@/public/images/Banner/greencrayola.jpg'
import colorBanner3 from '@/public/images/Banner/ultramarineblue.jpeg'
import colorBanner4 from '@/public/images/Banner/yelloworange.jpg'
import gradientBanner1 from '@/public/images/Banner/gradient1.jpg'
import gradientBanner4 from '@/public/images/Banner/gradient4.jpg'
import pictureBanner1 from '@/public/images/Banner/picture1.jpeg'
import pictureBanner2 from '@/public/images/Banner/picture2.jpg'
import pictureBanner3 from '@/public/images/Banner/picture3.jpg'
import pictureBanner4 from '@/public/images/Banner/picture4.jpg'

const colorImages = [
  colorBanner1,
  colorBanner2,
  colorBanner3,
  colorBanner4,
  gradientBanner1,
  gradientBanner4,
]

const pictureImages = [pictureBanner1, pictureBanner2, pictureBanner3, pictureBanner4]

const ChooseBanner = (props: {
  setBanner: (value: StaticImageData | undefined) => void
  setIsBanner: (value: boolean) => void
  label: string
}) => {
  const chooseImage = (value: StaticImageData) => {
    props.setBanner(value)
    props.setIsBanner(true)
  }

  const removeImage = () => {
    props.setBanner(undefined)
    props.setIsBanner(false)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="z-30 h-8 w-24 text-xs">
            {props.label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[19rem] sm:w-[36rem]">
          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h6 className="text-sm font-medium leading-none">Gallery</h6>
                <Button
                  variant={'secondary'}
                  className="text-sm font-medium leading-none"
                  onClick={removeImage}
                >
                  Remove
                </Button>
              </div>
              <hr />
              <p className="text-sm text-muted-foreground">colors</p>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {colorImages.map((image, index) => (
                <Button
                  key={index}
                  className="h-16 bg-transparent p-0 shadow-transparent"
                  onClick={() => chooseImage(image)}
                >
                  <Image src={image} alt={`Banner ${index + 1}`} className="h-16 rounded" />
                </Button>
              ))}
            </div>
            <hr />
            <p className="text-sm text-muted-foreground">pictures</p>
            <div className="grid grid-cols-4 gap-4">
              {pictureImages.map((image, index) => (
                <Button
                  key={index}
                  className="h-16 bg-transparent p-0 shadow-transparent"
                  onClick={() => chooseImage(image)}
                >
                  <Image src={image} alt={`Banner ${index + 1}`} className="h-16 rounded" />
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ChooseBanner
