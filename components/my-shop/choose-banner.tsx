import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'
import { deleteBanner, setBanner } from '@/lib/user-actions'
import { AiFillPicture } from 'react-icons/ai'

const colorImages = [
  '/images/Banner/cardinal.jpg',
  '/images/Banner/greencrayola.jpg',
  '/images/Banner/ultramarineblue.jpeg',
  '/images/Banner/yelloworange.jpg',
  '/images/Banner/gradient1.webp',
  '/images/Banner/gradient2.jpg',
  '/images/Banner/gradient3.webp',
]

const pictureImages = [
  '/images/Banner/picture1.webp',
  '/images/Banner/picture2.jpg',
  '/images/Banner/picture3.webp',
  '/images/Banner/picture4.jpg',
  '/images/Banner/picture5.webp',
  '/images/Banner/picture6.webp',
  '/images/Banner/picture7.webp',
  '/images/Banner/picture8.webp',
]

const ChooseBanner = (props: { setBanner: (value: string) => void }) => {
  const chooseImage = async (bannerURL: string) => {
    props.setBanner(bannerURL)
    await setBanner(bannerURL)
  }

  const removeImage = async () => {
    props.setBanner('/images/Banner/default.png')
    await deleteBanner()
  }

  return (
    <div className="absolute right-2 top-2 z-30 text-xs">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="z-30 h-8 w-8 rounded-xl border-none p-1 text-xs drop-shadow-xl hover:bg-transparent"
          >
            <AiFillPicture className=" h-9 w-9 fill-white drop-shadow-xl hover:fill-gray-300" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[36rem]">
          <div className="grid gap-4 space-y-2">
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
    </div>
  )
}

export default ChooseBanner
