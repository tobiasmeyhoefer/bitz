'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'
import { deleteBanner, setBanner } from '@/lib/user-actions'

const colorImages = [
  '/images/Banner/cardinal.jpg',
  '/images/Banner/greencrayola.jpg',
  '/images/Banner/ultramarineblue.jpeg',
  '/images/Banner/yelloworange.jpg',
  '/images/Banner/gradient1.jpg',
  '/images/Banner/gradient4.jpg',
]

const pictureImages = [
  '/images/Banner/picture1.jpeg',
  '/images/Banner/picture2.jpg',
  '/images/Banner/picture3.jpg',
  '/images/Banner/picture4.jpg',
]

const ChooseBanner = (props: {
  setBanner: (value: string) => void
  setIsBanner: (value: boolean) => void
  label: string
}) => {
  const chooseImage = async (bannerURL: string) => {
    props.setBanner(bannerURL)
    await setBanner(bannerURL)
    props.setIsBanner(true)
  }

  const removeImage = async () => {
    props.setBanner('')
    await deleteBanner()
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
        <PopoverContent className="w-[36rem]">
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
                  <Image
                    src={image}
                    alt={`Banner ${index + 1}`}
                    width={200}
                    height={140}
                    className="h-16 rounded"
                  />
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
                  <Image
                    src={image}
                    alt={`Banner ${index + 1}`}
                    width={200}
                    height={140}
                    className=" h-16 rounded"
                  />
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
