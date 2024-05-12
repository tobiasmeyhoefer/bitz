'use client'

import { signIn } from 'next-auth/webauthn'
import { Button } from '../ui/button'
import { useRouter } from '@/navigation'

const SignInPasskey = () => {
  const signInWithPasskey = () => {
    signIn('passkey').catch(() => {
      router.refresh()
      return
    })
  }

  const router = useRouter()
  return (
    <>
      <Button onClick={signInWithPasskey}>Sign in with Passkey</Button>
      <p className='mt-6'>
        tip: create normal account, find registering
        passkey option in the settings, enjoy
      </p>
    </>
  )
}

export default SignInPasskey
