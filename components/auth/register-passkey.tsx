'use client'

import { signIn } from 'next-auth/webauthn'
import { Button } from '../ui/button'
import { toast } from '../ui/use-toast'
import { useRouter } from '@/navigation'

interface RegisterPasskeyProps {
  translations: {
    registerPasskey: string
    registerPasskeySuccess: string
  }
}
const RegisterPasskey = ({translations}: RegisterPasskeyProps) => {
  const router = useRouter()

  const registerPasskey = () => {
    signIn('passkey', { action: 'register' }).catch(router.refresh)
    toast({
      description: translations.registerPasskeySuccess,
    })
  }
  return <Button className='max-w-full' onClick={registerPasskey}>{translations.registerPasskey}</Button>
}

export default RegisterPasskey
