/**
 * A React component that renders a select dropdown for switching the locale.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The options to display in the select dropdown.
 * @param {string} props.defaultValue - The default value to display in the select dropdown.
 * @param {string} props.label - The label to display for the select dropdown.
 * @returns {JSX.Element} - The LocaleSwitcherSelect component.
 */
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
        <SelectTrigger className="w-full">
          <SelectValue className='hover:cursor-pointer' placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </>
  )
}
