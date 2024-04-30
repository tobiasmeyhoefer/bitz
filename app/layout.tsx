import type { Metadata } from 'next'
import { Space_Grotesk, Montserrat } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navigation/NavBar'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'

const space_grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--space_grotesk' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--montserrat' })

export const metadata: Metadata = {
  title: 'BITZ',
  description: 'Kauf- und Verkaufsplattform',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
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
        {!!session?.user ? <main>test</main> : <main>{children}</main>}
        {/* // <main>{children}</main> */}
      </body>
    </html>
  )
}
