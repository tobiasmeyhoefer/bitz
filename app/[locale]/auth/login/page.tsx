import { auth } from '@/auth'
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
import { redirect } from '@/navigation'
import { getTranslations } from 'next-intl/server'

const Login = async () => {
  const t = await getTranslations("LoginForm")
  const session = await auth()
  if(!!session?.user) {
    redirect("/browse")
  }
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[500px] p-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("loginButton")}</CardTitle>
          <CardDescription>{t("loginMessage")}</CardDescription>
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
