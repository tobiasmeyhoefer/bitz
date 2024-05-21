'use client'

import { ReactNode, useTransition } from 'react'
import { useRouter, usePathname } from '@/navigation'
import {
  Select,
  SelectContent,
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
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </>
  )
}
