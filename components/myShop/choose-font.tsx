/**
 * A React component that renders a dropdown menu for choosing a font for the shop text.
 *
 * The component uses the `setShopTextFont` function from `@/lib/user-actions` to update the
 * font of the shop text when a new font is selected. The selected font is passed back to the
 * parent component via the `setFont` prop.
 *
 * The dropdown menu displays a list of available fonts, and the user can select a font by
 * clicking on it. The selected font is highlighted in the dropdown menu.
 *
 * @param props - An object containing the following properties:
 *   - `setFont`: A function that is called with the selected font when the user changes the font.
 */
import { setShopTextFont } from '@/lib/user-actions'
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

const fonts = ['Montserrat', 'Arial', 'Times New Roman', 'Courier New', 'Georgia']

export function ChooseFont(props: { setFont: (value: string) => void }) {
  const [position, setPosition] = useState('')

  const onSubmit = async (value: string) => {
    setPosition(value)
    await setShopTextFont(value)
    props.setFont(value)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="z-50">
          <Button
            variant="ghost"
            className="z-30 h-8 w-24 text-xs text-white hover:bg-transparent hover:text-gray-300"
          >
            change font
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>choose font</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={onSubmit}>
            {fonts.map((font, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={font}
                className="flex cursor-pointer items-center"
              >
                <p style={{ fontFamily: font, fontSize: 16 }}> {font}</p>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
