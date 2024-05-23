import { auth } from '@/auth'
import { Link, redirect } from '@/navigation'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'

const CubeScene = dynamic(() => import('@/components/explosion/cubeScene'), {
  ssr: false,
})

export default async function Home() {
  const t = await getTranslations('Landingpage')
  const session = await auth()
  if (!!session?.user) {
    redirect('/browse')
  }

  return (
    <main className="static h-screen ">
      <div className="static h-96 pt-24 md:static md:h-screen md:pt-24">
        <CubeScene />
      </div>

        <div className="flex w-screen flex-col justify-center p-4 lg:mr-12 lg:w-1/2 lg:p-24">
          <h1 className="text-4xl font-bold lg:text-5xl">Bitz</h1>
          <h2 className="mt-16 text-xl lg:mt-4 lg:text-2xl">{t('subtitle')}</h2>
          <p className="mt-4 text-sm lg:text-xl">{t('description')}</p>
          <p className="mt-4 text-lg lg:text-xl">{t('call')}</p>
          <div className="mt-8 flex space-x-4">
            <Link href="/auth/login">
              <Button variant="callToAction" size={'lg'}>
                {t('callButton')}
              </Button>
            </Link>
            <Link href="#next-section">
              <Button variant="outline" size={'lg'}>
                {t('learnButton')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex h-1/2 w-screen items-center justify-center rounded-full lg:mt-12 lg:h-screen lg:w-screen lg:justify-center">
          <CubeScene />
        </div>
      </section>

      <Link href={'/auth/login'}>
        <div className="absolute bottom-24 right-7 h-24 w-72 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 font-space_grotesk text-4xl text-white hover:scale-105 hover:opacity-85 md:right-24 md:w-96 lg:h-24">
          <div className="absolute right-6 mt-6 h-12 w-12 rounded-full bg-white md:right-9 md:mt-4 md:h-16 md:w-16">
            <ChevronRightIcon className="relative size-12 text-black md:size-16" />
          </div>
          <div className="relative left-0 mt-7 text-3xl md:left-10">{t('button')}</div>
        </div>
      </Link>

      {/ Beschreibungstext  */}
      <div className="absolute bottom-48 left-8 rounded-md p-5 font-space_grotesk text-black drop-shadow-2xl  md:left-24 lg:bottom-16 lg:w-7/12">
        <p className="text-2xl md:text-5xl">
          <em>Bitz</em>
        </p>
        <p className="mt-4 text-lg md:text-2xl">{t('subtitle')}</p>
        <p className="mt-4 text-sm md:text-xl">{t('description')}</p>
        <p className="mt-4 text-lg md:text-2xl">{t('call')}</p>
      </div>
    </main>
  )
}