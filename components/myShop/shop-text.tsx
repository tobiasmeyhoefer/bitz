'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getShopName, getShopTextColor, setShopName } from '@/lib/user-actions'
import { ChooseFontcolor } from './choose-fontcolor'

export function ShopText({ title }: { title: string }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [textColor, setTextColor] = useState('')

  useEffect(() => {
    const fetchShopname = async () => {
      const shopname = await getShopName()
      const shopcolor = await getShopTextColor()
      if (shopname) {
        setText(shopname)
      } else {
        setText(title)
      }
      if (shopcolor) {
        setTextColor(shopcolor)
      }
    }
    fetchShopname()
  }, [title])

  async function onSubmit() {
    setOpen(!open)
    await setShopName(text)
  }
  return (
    <>
      {!open ? (
        <div className="flex gap-6 ">
          <div className=" z-30">
            <ChooseFontcolor setColor={setTextColor} />
          </div>
          <h1
            style={{ color: textColor }}
            className={` bottom-2 font-montserrat text-3xl font-bold drop-shadow-xl`}
          >
            {text}
            <Button
              onClick={() => setOpen(!open)}
              className="absolute right-[-24px] top-[-16px] h-8 w-6 bg-transparent shadow-none hover:bg-transparent"
            >
              <p className="rounded-md p-[0.1rem] text-card-button hover:bg-secondary">✏️</p>
            </Button>
          </h1>
          <div className=" z-30">
            <ChooseFontcolor setColor={setTextColor} />
          </div>
        </div>
      ) : (
        <form action={onSubmit} className="relative inline">
          <div className="flex flex-row gap-1">
            <Input
              type="text"
              name="shopname"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="My Shop"
              className="text-3xl font-bold"
            />
            <Button type="submit" variant={'secondary'}>
              <p className="text-card-button hover:font-bold"> save</p>
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
