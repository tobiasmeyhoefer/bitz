import { auth } from "@/auth"
import { SignIn } from "@/components/sign-in"
import { SignOut } from "@/components/sign-out"

export default async function Home() {
  const session = await auth()

  if (!session?.user)
    return (
      <>
        <SignIn />
        <SignOut />  
      </>
    )

  return (
    <>
      <main>BITZ</main>
      <SignIn />
      <SignOut />
    </>
  )
}
