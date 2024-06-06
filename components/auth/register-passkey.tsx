'use client'

import { signIn } from 'next-auth/webauthn'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { useRouter } from '@/navigation'

const RegisterPasskey = () => {
  const router = useRouter()

  const registerPasskey = () => {
    signIn('passkey', { action: 'register' }).catch(router.refresh)
    toast({
      description: 'Passkey erfolgreich hinzugefügt',
    })
  }
  return <Button onClick={registerPasskey}>Register new Passkey</Button>
}

export default RegisterPasskey
