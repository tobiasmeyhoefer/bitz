import { signIn } from "@/auth"
import { Button } from "./ui/button"
 
export function RegisterForm() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit">Or Signin with Google</Button>
    </form>
  )
} 