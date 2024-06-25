'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getShopName, getShopTextColor, getShopTextFont, setShopName } from '@/lib/user-actions'
import { ChooseFontcolor } from './choose-fontcolor'
import { ChooseFont } from './choose-font'

export function ShopText({ title, isBanner }: { title: string; isBanner: boolean }) {
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
    <>
      {!open ? (
        <div className={isBanner ? 'absolute bottom-2 left-1/2 h-8 w-full -translate-x-1/2' : ' '}>
          <div className="flex flex-row justify-center ">
            <h1
              style={{ color: textColor, fontFamily: textFont }}
              className=" text-3xl font-bold drop-shadow-xl"
            >
              {text}
              <Button
                onClick={() => setOpen(!open)}
                className="absolute right-[-24px] top-[-16px] h-8 w-6 bg-transparent shadow-none hover:bg-transparent"
              >
                <p className="rounded-md p-[0.1rem] text-card-button hover:bg-secondary">✏️</p>
              </Button>
            </h1>
            <div className="absolute bottom-10 right-2">
              <div className=" z-30 mb-2">
                <ChooseFont setFont={setTextFont} />
              </div>
              <ChooseFontcolor setColor={setTextColor} />
            </div>
          </div>
        </div>
      ) : (
        <form action={onSubmit} className={isBanner ? '' : 'relative inline'}>
          <div className={isBanner ? 'absolute bottom-2 left-1/2 h-8 -translate-x-1/2' : ''}>
            <div className={' flex flex-row gap-1'}>
              <Input
                type="text"
                name="shopname"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="My Shop"
                className="text-xl font-bold md:text-3xl"
              />
              <Button type="submit" variant={'secondary'}>
                <p className="text-card-button hover:font-bold"> save</p>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-12 right-2">
            <div className=" z-30 mb-2">
              <ChooseFont setFont={setTextFont} />
            </div>
            <ChooseFontcolor setColor={setTextColor} />
          </div>
        </form>
      )}
    </>
  )
}
