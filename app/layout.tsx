import type { Metadata } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navigation/NavBar'
import { cn } from '@/lib/utils'

const space_grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--space_grotesk' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--montserrat' })

export const metadata: Metadata = {
  title: 'BITZ',
  description: 'Kauf- und Verkaufsplattform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          space_grotesk.variable,
          montserrat.variable,
        )}
      >
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
