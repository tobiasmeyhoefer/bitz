'use client'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getShopName, getShopTextColor, getShopTextFont, setShopName } from '@/lib/user-actions'
import { ChooseFontcolor } from './choose-fontcolor'
import { ChooseFont } from './choose-font'

export function ShopText({ title }: { title: string }) {
  const [text, setText] = useState('')
  const [textColor, setTextColor] = useState('')
  const [textFont, setTextFont] = useState('')

  useEffect(() => {
    const fetchShopname = async () => {
      const shopname = await getShopName()
      const shopcolor = await getShopTextColor()
      const shopfont = await getShopTextFont()
      if (shopname) {
        setText(shopname)
      } else {
        setText(title)
      }
      if (shopcolor) {
        setTextColor(shopcolor)
      }
      if (shopfont) {
        setTextFont(shopfont)
      }
    }
    fetchShopname()
  }, [title])

  async function onInputChange(value: string) {
    setText(value)
    setTimeout(async () => {
      await setShopName(value)
    }, 3500)
  }

  return (
    <div>
      <div className="group absolute bottom-0 h-full w-full">
        <div className="absolute bottom-2 left-24 h-8 ">
          <div className=" flex flex-row gap-1 ">
            <Input
              type="text"
              name="shopname"
              value={text}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="My Shop"
              className="z-40 w-auto border-none text-xl font-bold md:text-3xl"
              style={{
                color: textColor,
                fontFamily: textFont,
                textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)',
              }}
            />
          </div>
        </div>

        <div className="absolute left-2 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className=" z-30 flex flex-row gap-2">
            <ChooseFont setFont={setTextFont} />
            <ChooseFontcolor setColor={setTextColor} />
          </div>
        </div>
      </div>
    </div>
  )
}
