import { auth } from '@/auth'
import { redirect } from '@/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if(!session?.user) {
    redirect("/auth/login")
  }
  return (<>
  {children}
  </>)
}
