import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {

  const session = await auth()
  if(!!session?.user) {
    redirect("/browse")
  }

  return(
    <h1 className="font-montserrat">Landing Page is working</h1>
  )
}
