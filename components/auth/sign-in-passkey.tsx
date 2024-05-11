"use client"

import { signIn } from "next-auth/webauthn"
import { Button } from "../ui/button"
import { useRouter } from "@/navigation"

const SignInPasskey = () => {
  const router = useRouter()
  return <Button onClick={() => signIn('passkey').catch(router.refresh)}>Sign in with Passkey</Button>
}

export default SignInPasskey
