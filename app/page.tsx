import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  return(
    <h1>Landing Page is working</h1>
  )
}
