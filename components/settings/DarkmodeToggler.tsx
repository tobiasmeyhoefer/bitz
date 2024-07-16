/**
 * A React component that provides a dropdown menu to toggle the theme between light, dark, and system.
 *
 * @param {ThemeProps} props - The props for the component.
 * @param {object} props.translations - An object containing translations for the component.
 * @param {string} props.translations.theme - The translation for the "theme" label.
 * @returns {JSX.Element} - The rendered DarkmodeToggler component.
 */
'use client'

import * as React from 'react'
import { BsBrightnessAltHigh } from 'react-icons/bs'
import { BsBrightnessAltHighFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ThemeProps {
  translations: {
    theme: string,
  }
}
export function DarkmodeToggler({ translations }: ThemeProps) {
  const { setTheme } = useTheme()

  return (
    <div>
      <h4 className="mb-2">{translations.theme}</h4>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className='w-full' size="icon">
            <BsBrightnessAltHigh className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <BsBrightnessAltHighFill className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
