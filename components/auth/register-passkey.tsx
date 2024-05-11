"use client"

import { signIn } from "next-auth/webauthn"

const RegisterPasskey = () => {
  return (
    <button onClick={() => signIn('passkey', { action: 'register' })}>
      Register new Passkey
    </button>
  )
}

export default RegisterPasskey
