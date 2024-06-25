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
          <Button variant="secondary" className="z-30 h-8 w-24 text-xs">
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
