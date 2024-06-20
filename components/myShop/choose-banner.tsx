'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image, { StaticImageData } from 'next/image'
import image1 from '@/public/images/test_banner.jpg'

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
              <p className="text-xs text-muted-foreground">choose your Banner</p>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Button
                className="h-16 bg-transparent p-0 shadow-transparent"
                onClick={() => chooseImage(image1)}
              >
                <Image src={image1} alt="Product Image" className="h-16 rounded" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ChooseBanner
