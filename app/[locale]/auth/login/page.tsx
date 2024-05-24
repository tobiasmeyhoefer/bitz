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
import SignInPasskey from '@/components/auth/sign-in-passkey'
import { BorderBeam } from '@/components/magicui/border-beam'
import RadialGradient from '@/components/magicui/radial-gradient'
import DotPattern from '@/components/magicui/dot-pattern'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Login = () => {
  const t = useTranslations('LoginForm')
  const CubeSceneNav = dynamic(() => import('@/components/explosion/cubeSceneNav'), {
    ssr: false,
  })
  // const session = await auth()
  // if (!!session?.user) {
  //   redirect('/browse')
  // }
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Link href="/" className="absolute top-0 left-12 h-[180px] w-[220px] sm:mr-10">
        <CubeSceneNav />
      </Link>
      <div className="relative mx-8 w-full rounded-xl p-[1px] md:w-[800px]">
        <Card className="z-10 w-full p-4 md:p-10">
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
                <SignInPasskey
                  text={t('loginOrPasskey')}
                  button={t('loginPasskeyButton')}
                  tip={t('loginPasskeyTip')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <BorderBeam className="-z-10" />
      </div>
      <RadialGradient className="-z-10" size={600} from="rgba(40, 0, 40, 0.1)" />
      <DotPattern className="-z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]" />
    </div>
  )
}

export default Login
