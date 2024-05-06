'use client'

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { ChangeEvent, ReactNode, useTransition } from 'react'
import { useRouter, usePathname } from '@/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname: string = usePathname()
  // const params = useParams()

  function onSelectChange(locale: string) {
    const nextLocale = locale
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <>
      {/* <label
        className={clsx(
          'relative text-gray-400',
          isPending && 'transition-opacity [&:disabled]:opacity-30',
        )}
      >
        <p className="sr-only">{label}</p>
        <select
          className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-2 top-[8px]">
          ⌄
        </span>
      </label> */}

      <Select onValueChange={onSelectChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </>
  )
}
