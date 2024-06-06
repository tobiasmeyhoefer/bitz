'use client'

import { signIn } from 'next-auth/webauthn'
import { Button } from '../ui/button'
import { useRouter } from '@/navigation'

const SignInPasskey = (intlProps: { text: string; button: string; tip: string }) => {
  const signInWithPasskey = () => {
    signIn('passkey').catch(() => {
      router.refresh()
      return
    })
  }
  const router = useRouter()
  return (
    <>
      <p className="mb-6 text-sm text-neutral-600">{intlProps.text}</p>
      <Button onClick={signInWithPasskey} className="bg-card-button h-12 w-1/2">
        {intlProps.button}
      </Button>
      <p className="mt-6 text-sm text-neutral-600">{intlProps.tip}</p>
    </>
  )
}

export default SignInPasskey
