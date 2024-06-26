'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getShopName, getShopTextColor, getShopTextFont, setShopName } from '@/lib/user-actions'
import { ChooseFontcolor } from './choose-fontcolor'
import { ChooseFont } from './choose-font'
import { FaPencilAlt } from 'react-icons/fa'

export function ShopText({ title }: { title: string }) {
  const [open, setOpen] = useState(false)
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

  async function onSubmit() {
    setOpen(!open)
    await setShopName(text)
  }
  return (
    <div>
      {!open ? (
        <div className="group absolute bottom-0 h-full w-full">
          <div className="absolute bottom-2 left-24 h-8">
            <div className="flex w-full flex-row">
              <h1
                style={{ color: textColor, fontFamily: textFont }}
                className=" text-3xl font-bold drop-shadow-xl"
              >
                {text}
              </h1>
              <FaPencilAlt onClick={() => setOpen(!open)} className="cursor-pointer " />
            </div>
          </div>
          <div className="absolute left-2 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className=" z-30 flex flex-row gap-2">
              <ChooseFont setFont={setTextFont} />
              <ChooseFontcolor setColor={setTextColor} />
            </div>
          </div>
        </div>
      ) : (
        <form action={onSubmit} className="">
          <div className="absolute bottom-2 left-24 h-8">
            <div className={' flex flex-row gap-1'}>
              <Input
                type="text"
                name="shopname"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="My Shop"
                className="border-none text-xl font-bold md:text-3xl"
                style={{ color: textColor, fontFamily: textFont }}
              />
              <Button type="submit" variant={'secondary'}>
                <p className="text-card-button hover:font-bold"> save</p>
              </Button>
            </div>
          </div>

          <div className="absolute left-2 top-4">
            <div className=" z-30 flex flex-row gap-2">
              <ChooseFont setFont={setTextFont} />
              <ChooseFontcolor setColor={setTextColor} />
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
