/**
 * The root layout component for the application.
 * This component renders the children components and also includes the `Ai` component.
 * The `Ai` component is likely a custom component that provides some AI-related functionality.
 */
import Ai from '@/components/ai/ai'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <div className="">
        <Ai />
      </div>
    </>
  )
}
