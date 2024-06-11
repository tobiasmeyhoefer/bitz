import ExperimentalAi from '@/components/ai/experimental-ai'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <ExperimentalAi />
    </>
  )
}
