/**
 * A React component that provides a dropdown menu for selecting a font color.
 *
 * The component uses the `DropdownMenu` UI component from the `@/components/ui/dropdown-menu` module to display a list of color options. When a color is selected, the `setShopTextColor` function from `@/lib/user-actions` is called to update the shop's text color, and the `setColor` function passed as a prop is called to update the parent component's state.
 *
 * @param props - An object with a `setColor` function that is called when a color is selected.
 * @param props.setColor - A function that is called with the selected color value.
 */
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
          <Button
            variant="ghost"
            className="z-30 h-8 w-24 text-xs text-white hover:bg-transparent hover:text-gray-300"
          >
            change color
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>choose fontcolor</DropdownMenuLabel>
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
