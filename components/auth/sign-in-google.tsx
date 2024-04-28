import { signIn } from "@/auth"
import { Button } from "../ui/button"
import { FaSignInAlt } from "react-icons/fa";

export function SignInGoogle() {
  return (
    <form action={async (formData) => {
      "use server"
      await signIn("google")
    }}>
      <Button className="w-[130px]" variant="outline" type="submit"> <FaSignInAlt/> </Button>     
    </form>
  )
}