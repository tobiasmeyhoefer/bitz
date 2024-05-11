"use client"

import { signIn } from "next-auth/webauthn"
import { Button } from "../ui/button"

const RegisterPasskey = () => {
  return (
    <Button onClick={() => signIn('passkey', { action: 'register' })}>
      Register new Passkey
    </Button>
  )
}

export default RegisterPasskey
