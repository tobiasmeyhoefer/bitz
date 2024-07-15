import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'

export function SignInGoogle() {
  return (
    <form
      className="w-full"
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <Button className="md:h-[60px] h-[50px] w-full bg-inherit" variant="outline" type="submit">
        {' '}
        <FcGoogle />
      </Button>
    </form>
  )
}
