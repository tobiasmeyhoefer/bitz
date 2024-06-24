'use client'
import { setShopTextColor } from '@/lib/user-actions'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const colors = [
  { value: 'rgb(0,0,0)', text: 'Black' },
  { value: 'rgb(255,255,255)', text: 'White' },
  { value: 'rgb(239 68 68)', text: 'Red' },
  { value: 'rgb(59 130 246)', text: 'Blue' },
  { value: 'rgb(250 204 21)', text: 'Yellow' },
  { value: 'rgb(5 150 105)', text: 'Green' },
  { value: 'rgb(244 114 182)', text: 'Pink' },
]

export function ChooseFontcolor(props: { setColor: (value: string) => void }) {
  const [position, setPosition] = useState('')

  const onSubmit = async (value: string) => {
    setPosition(value)
    await setShopTextColor(value)
    props.setColor(value)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="z-50">
          <Button variant="outline">change Color</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>choose Fontcolor</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={onSubmit}>
            {colors.map((color, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={color.value}
                className="flex cursor-pointer items-center"
              >
                <div
                  className="mr-2 h-4 w-4 rounded-full drop-shadow-lg"
                  style={{ backgroundColor: color.value }}
                />
                {color.text}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
