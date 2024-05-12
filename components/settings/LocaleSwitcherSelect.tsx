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

  function onSelectChange(locale: string) {
    const nextLocale = locale
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <>
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
