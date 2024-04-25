import { signIn } from "@/auth"
import { Button } from "../ui/button"
 
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("google")
      }}
    >

      <Button type="submit"/>
      
    </form>
  )
}