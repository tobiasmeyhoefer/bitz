'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getShopName, setShopName } from '@/lib/user-actions'

export function ChangeText() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const fetchShopname = async () => {
      const shopname = await getShopName()
      if (shopname) {
        setText(shopname)
      } else {
        setText('MY SHOP')
      }
    }
    fetchShopname()
  }, [])

  async function onSubmit() {
    setOpen(!open)
    await setShopName(text)
  }

  return (
    <>
      {!open ? (
        <h1 className="group bottom-2 font-montserrat text-3xl font-bold drop-shadow-xl">
          {text}
          <Button
            onClick={() => setOpen(!open)}
            className="absolute right-[-24px] top-[-16px] h-8 w-6 bg-transparent shadow-none hover:bg-transparent"
          >
            <p className="rounded-md p-[0.1rem] text-card-button hover:bg-secondary"> ✏️</p>
          </Button>
        </h1>
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
