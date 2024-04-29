import { SignInGoogle } from '@/components/auth/sign-in-google'
import { SignInResend } from '@/components/auth/sign-in-resend'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Login = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[500px] p-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">anmelden</CardTitle>
          <CardDescription>via Google oder Email</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid w-full items-center gap-8">
            <div>
              <SignInResend />
            </div>
            <div>
              <SignInGoogle />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
