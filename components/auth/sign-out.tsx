import { signOut } from "@/auth"
import { Button } from "../ui/button"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        console.log("before signout")
        await signOut()
        console.log("after signout")
      }}
    >
      <Button type="submit">abmelden</Button>
    </form>
  )
}