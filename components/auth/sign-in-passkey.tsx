"use client"

import { signIn } from "next-auth/webauthn"
import { Button } from "../ui/button"
import { useRouter } from "@/navigation"
import { useToast } from "../ui/use-toast"


const SignInPasskey = () => {

  const { toast } = useToast()
  
  const signInWithPasskey = () => {
    signIn('passkey').catch(() => {
      router.refresh()
      return;
    })
    toast({
      description: "Passkey erfolgreich hinzugefügt",
    })
  }

  const router = useRouter()
  return <Button onClick={signInWithPasskey}>Sign in with Passkey</Button>
}

export default SignInPasskey
