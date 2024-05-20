import type { Metadata } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navigation/NavBar'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/darkmode/themeProvider'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--space_grotesk',
})
const montserrat = Montserrat({ subsets: ['latin'], variable: '--montserrat' })

export const metadata: Metadata = {
  title: 'BITZ',
  description: 'Kauf- und Verkaufsplattform',
}
/** hier wird page.tsx eingebunden */
export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale}>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
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
          <header>
            <NavBar />
          </header>
          <main className="h-fit min-h-screen">{children}</main> {/* bg-white rausgenommen*/}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
