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
import { signIn } from 'next-auth/webauthn'
import SignInPasskey from '@/components/auth/sign-in-passkey'
import { BorderBeam } from '@/components/magicui/border-beam'
import RadialGradient from '@/components/magicui/radial-gradient'
import DotPattern from '@/components/magicui/dot-pattern'

const Login = async () => {
  const t = await getTranslations('LoginForm')
  const session = await auth()
  if (!!session?.user) {
    redirect('/browse')
  }
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className='relative md:w-[800px] w-full rounded-xl p-[1px] mx-8'>
        <Card className="w-full p-4 md:p-10 z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('loginButton')}</CardTitle>
            <CardDescription>{t('loginMessage')}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid w-full items-center gap-8">
              <div>
                <SignInResend />
              </div>
              <div>
                <SignInGoogle />
              </div>
              <div>
                <SignInPasskey text={t("loginOrPasskey")} button={t("loginPasskeyButton")} tip={t("loginPasskeyTip")}/>
              </div>
            </div>
          </CardContent>
        </Card>
        <BorderBeam className='-z-10'/>
      </div>
      <RadialGradient className='-z-10' size={600} from='rgba(40, 0, 40, 0.1)'/>
      <DotPattern className='-z-10 md:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]' />
    </div>
  )
}

export default Login
