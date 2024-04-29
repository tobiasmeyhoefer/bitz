import { signIn } from '@/auth'
import { Button } from '../ui/button'
import { MdEmail } from 'react-icons/md'
import { Input } from '../ui/input'

export function SignInResend() {
  return (
    <form
      className="flex flex-col items-center gap-4"
      action={async (formData) => {
        'use server'
        await signIn('resend', formData)
      }}
    >
      <Input className="h-[60px] w-full p-4" type="text" name="email" placeholder="john@doe.com" />

      <Button className=" h-[60px] w-full" variant={'outline'} type="submit">
        anmelden
      </Button>
    </form>
  )
}
