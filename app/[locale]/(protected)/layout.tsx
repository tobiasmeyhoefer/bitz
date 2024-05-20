import { auth } from '@/auth'
import { ThemeProvider } from '@/components/darkmode/themeProvider'
import { redirect } from '@/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  )
}
