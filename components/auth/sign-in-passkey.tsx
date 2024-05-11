"use client"

import { signIn } from "next-auth/webauthn"

const SignInPasskey = () => {
  return <button onClick={() => signIn('passkey')}>Sign in with Passkey</button>
}

export default SignInPasskey
