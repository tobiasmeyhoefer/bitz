import { signIn } from "@/auth"
import { Button } from "../ui/button"
import { FaSignInAlt } from "react-icons/fa";
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("google")
      }}
    >

      <Button variant="outline" type="submit"> <FaSignInAlt/> </Button>
      
    </form>
  )
}