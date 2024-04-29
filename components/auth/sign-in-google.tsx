import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { FaSignInAlt } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export function SignInGoogle() {
  return (
    <form
      className="flex flex-col gap-6"
      action={async (formData) => {
        'use server'
        await signIn('google')
      }}
    >
      <p>mit Google anmelden:</p>
      <Button className="h-[60px] w-full" variant="outline" type="submit">
        {' '}
        <FcGoogle />
      </Button>
    </form>
  )
}
