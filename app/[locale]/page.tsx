import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Link, redirect } from '@/navigation'
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
    <main className="static h-screen snap-y snap-mandatory overflow-y-scroll">
      <section className="mt-20 flex h-screen snap-start flex-col font-space_grotesk md:flex-row">
        <div className="flex w-full flex-col justify-center p-4 md:mr-36 md:w-1/2 md:p-24">
          <h1 className="text-4xl font-bold md:text-5xl">Bitz</h1>
          <h2 className="mt-16 text-xl md:mt-4 md:text-2xl">{t('subtitle')}</h2>
          <p className="mt-4 text-sm md:text-xl">{t('description')}</p>
          <p className="mt-4 text-lg md:text-xl">{t('call')}</p>
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
        <div className="mt-16 flex w-screen items-center justify-center rounded-full md:w-1/2">
          <CubeScene />
        </div>
      </section>

      <section
        id="next-section"
        className="relative flex h-screen snap-start flex-col items-center justify-center bg-blue-400 pb-[10vh] font-space_grotesk text-white"
      >
        <h2 className="mb-8 text-4xl font-bold">Was machen wir anders?</h2>
        <div className="mt-4 flex flex-col items-center space-y-8 md:flex-row md:space-x-16 md:space-y-0">
          <div className="flex flex-col items-center">
            <Icons.shield className="h-48 w-96" />
            <p className="mt-2 text-4xl">Sicherheit</p>
          </div>
          <div className="flex flex-col items-center">
            <Icons.cable className="h-12 w-12" />
            <p className="mt-2 text-4xl">Technik Fokus</p>
          </div>
          <div className="flex flex-col items-center">
            <Icons.paintbrush className="h-24 w-24" />
            <p className="mt-2 text-4xl">Design</p>
          </div>
        </div>
      </section>
      <section
        id="circle-section"
        className="relative flex h-screen snap-start flex-col items-center justify-center bg-blue-950 pb-[10vh] text-white"
      >
        <h2 className="mb-8 text-4xl font-bold">Wie Gehts?</h2>
        <div className="relative grid w-11/12 grid-cols-3 grid-rows-3 items-center justify-center">
          <div className="col-start-2 row-start-1 flex flex-col items-center justify-center text-center">
            <Icons.store className="h-12 w-12" />
            <p className="mt-2 text-xl">Shop erstellen</p>
          </div>
          <div className="col-start-3 row-start-2 flex flex-col items-center justify-center text-center">
            <Icons.shoppingCart className="h-12 w-12" />
            <p className="mt-2 text-xl">Produkte kaufen</p>
          </div>
          <div className="col-start-2 row-start-3 flex flex-col items-center justify-center text-center">
            <Icons.handshake className="h-12 w-12" />
            <p className="mt-2 text-xl">Technik-Produkte verkaufen</p>
          </div>
          <div className="col-start-1 row-start-2 flex flex-col items-center justify-center text-center">
            <Icons.user className="h-12 w-12" />
            <p className="mt-2 text-xl">Account erstellen</p>
          </div>
        </div>
      </section>
    </main>
  )

  // return (
  //   <main className="static h-screen snap-y snap-mandatory overflow-y-scroll">
  //     <section className="h-screen snap-start">
  //       <div className="top h-96 pt-16 md:static md:h-screen md:pt-24">
  //         <CubeScene />
  //       </div>

  //       <Link href={'/auth/login'}>
  //         <div className="absolute bottom-24 right-7 h-24 w-72 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 font-space_grotesk text-4xl text-white hover:scale-105 hover:opacity-85 md:right-24 md:w-96 lg:h-24">
  //           <div className="absolute right-6 mt-6 h-12 w-12 rounded-full bg-white md:right-9 md:mt-4 md:h-16 md:w-16">
  //             <ChevronRightIcon className="relative size-12 text-black md:size-16" />
  //           </div>
  //           <div className="relative left-0 mt-7 text-3xl md:left-10">{t('button')}</div>
  //         </div>
  //       </Link>
  //       <div className="static bottom-48 left-8 rounded-md p-5 font-space_grotesk text-black drop-shadow-2xl  md:left-24 lg:bottom-16 lg:w-7/12">
  //         <p className="text-2xl md:text-5xl">
  //           <em>Bitz</em>
  //         </p>
  //         <p className="mt-4 text-lg md:text-2xl">{t('subtitle')}</p>
  //         <p className="mt-4 text-sm md:text-xl">{t('description')}</p>
  //         <p className="mt-4 text-lg md:text-2xl">{t('call')}</p>
  //       </div>
  //     </section>
  //     <section className="realtive h-screen snap-start flex-col items-center justify-center bg-red-600 pb-[10vh] text-[3.5vw] text-white">
  //       Hello World!
  //     </section>
  //     <section className="realtive h-screen snap-start flex-col items-center justify-center bg-blue-600 pb-[10vh] text-[3.5vw] text-white">
  //       Bye World!
  //     </section>
  //   </main>
  // )
}
