/**
 * A React component that renders a button to register a passkey for authentication.
 *
 * @param translations - An object containing localized strings for the component.
 * @param translations.registerPasskey - The text to display on the button.
 * @param translations.registerPasskeySuccess - The success message to display after registering a passkey.
 * @returns A React element representing the register passkey button.
 */
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
