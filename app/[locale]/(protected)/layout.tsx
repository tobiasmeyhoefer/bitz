/**
 * The root layout component for the application.
 * This component renders the children components and also includes the `ExperimentalAi` component.
 * The `ExperimentalAi` component is likely a custom component that provides some experimental AI-related functionality.
 */
import ExperimentalAi from '@/components/ai/experimental-ai'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <div className="">
        <ExperimentalAi />
      </div>
    </>
  )
}
