/**
 * Renders a shop text input component that allows the user to update the shop name.
 * The component fetches the current shop name and text font from the database and displays them in an input field.
 * The input field updates the shop name in the database after 3.5 seconds of no new input.
 * The component also includes a font selection dropdown that allows the user to change the font of the shop name.
 *
 * @param {string} title - The default shop name to display if no shop name is found in the database.
 * @returns {JSX.Element} - The rendered shop text input component.
 */
'use client'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getShopName, getShopTextFont, setShopName } from '@/lib/user-actions'
import { ChooseFont } from './choose-font'

export function ShopText({ title }: { title: string }) {
  const [text, setText] = useState<string | null>(null)
  const [textFont, setTextFont] = useState<string | null>(null)

  useEffect(() => {
    const fetchShopname = async () => {
      const shopname = await getShopName()
      const shopfont = await getShopTextFont()
      setText(shopname ?? title)
      setTextFont(shopfont)
    }
    fetchShopname()
  }, [title])

  // Saves the changed text in the Database after 3500ms of no new input
  async function onInputChange(value: string) {
    setText(value)
    setTimeout(async () => {
      await setShopName(value)
    }, 3500)
  }

  if (text === null) {
    return null
  }

  return (
    <div>
      <div className="group absolute bottom-0 h-full w-full">
        <div className="absolute bottom-2 left-10 h-8 lg:left-24 ">
          <div className=" flex flex-row gap-1 ">
            <Input
              type="text"
              name="shopname"
              value={text!}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="My Shop"
              className="z-40 md:w-[880px] w-[300px] border-none text-xl font-bold text-white md:text-3xl"
              style={{
                fontFamily: textFont!,
                textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)',
                outline: 'none',
                boxShadow: 'none',
              }}
              maxLength={40}
            />
          </div>
        </div>

        <div className="absolute left-10 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:left-24">
          <div className=" z-30 flex flex-row gap-2">
            <ChooseFont setFont={setTextFont} />
          </div>
        </div>
      </div>
    </div>
  )
}
