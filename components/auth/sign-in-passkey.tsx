"use client"

import { signIn } from "next-auth/webauthn"
import { Button } from "../ui/button"
import { useRouter } from "@/navigation"
import { toast } from "../ui/use-toast"


const SignInPasskey = () => {
  
  const signInWithPasskey = () => {
    signIn('passkey').catch(() => {
      router.refresh()
      return;
    })
  }

  const router = useRouter()
  return <Button onClick={signInWithPasskey}>Sign in with Passkey</Button>
}

export default SignInPasskey
