'use client'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'
import { deleteBanner, setBanner } from '@/lib/user-actions'
import ColorPicker from 'react-pick-color'
import { useState } from 'react'
const ChooseFontcolor = () => {
  const [color, setColor] = useState('#fff')
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="z-30 h-8 w-24 text-xs">
            fontColor
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[36rem]">
          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h6 className="text-sm font-medium leading-none">Gallery</h6>
                <ColorPicker color={color} onChange={(color) => setColor(color.hex)} />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ChooseFontcolor
