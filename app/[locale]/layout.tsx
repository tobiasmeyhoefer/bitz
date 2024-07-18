//This is the main layout component for the application, responsible for rendering the overall structure of the page,
//including the navigation bar, main content area, and global UI elements like the toaster.
//The layout component sets up the HTML structure, applies global styles and font imports, and renders the navigation bar,
// main content area, and toaster.It also sets up the theme provider to handle the application's dark mode functionality.
//The layout component is marked as `async` and accepts a `locale` parameter, which is used to set the `lang` attribute on the `<html>` element.
// This allows the application to support multiple locales.

import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navigation/navbar'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/darkmode/theme-provider'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--space_grotesk',
})
const montserrat = Montserrat({ subsets: ['latin'], variable: '--montserrat' })

export const metadata: Metadata = {
  title: 'BITZ',
  description: 'Kauf- und Verkaufsplattform',
}

export const viewport: Viewport = {
  maximumScale: 1,
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale} className="" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-svh overflow-x-hidden bg-background font-space_grotesk antialiased overflow-y-scroll',
          space_grotesk.variable,
          montserrat.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-center">
            <header className="w-screen md:max-w-[1420px]">
              <NavBar />
            </header>
          </div>
          <main className="flex h-[calc(100svh-80px)] justify-center">
            <div className="w-screen md:max-w-[1420px]">{children}</div>
          </main>{' '}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
