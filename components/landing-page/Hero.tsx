import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { HeroCards } from '@/components/landing-page/HeroCards'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Link } from '@/navigation'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'

const CubeScene = dynamic(() => import('@/components/explosion/cubeScene'), {
  ssr: false,
})

const t = getTranslations('Landingpage')

export const Hero = () => {
  return (
    <section className="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
      <div className="space-y-6 text-center lg:text-start">
        <main className="font-montserrat text-5xl font-bold md:text-6xl">
          <div id="clickEventWrapper" className="h-[300px] md:h-[400px]">
            {/* <Suspense fallback={<p className="absolute left-0 top-0">Das ist ein test</p>}> */}
              <CubeScene />
            {/* </Suspense> */}
          </div>
          {/* <CubeScene /> */}
          <h1 className="inline">
            VON{' '}
            <span className="inline bg-gradient-to-r from-indigo-700  to-indigo-800 bg-clip-text text-transparent">
              GESTERN
            </span>{' '}
            FÜR
          </h1>{' '}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-indigo-700  to-indigo-800 bg-clip-text text-transparent">
              MORGEN
            </span>{' '}
            <span className="text-xl">MIT TECHNIK VERSORGEN</span>
          </h2>
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
          Entdecke die neue Kauf- und Verkaufsplattform
        </p>

        <div className="space-y-4 md:space-x-4 md:space-y-0">
          <Link href={'/auth/login'}>
            <Button className="w-full md:w-1/3">Get Started</Button>
          </Link>

          <Link
            rel="noreferrer noopener"
            href="https://github.com/tobiasmeyhoefer/bitz"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: 'outline',
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  )
}