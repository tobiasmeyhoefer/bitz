import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import ScrollToTopButton from '@/components/ui/scrollToTopButton'
import { Link, redirect } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const CubeScene = dynamic(() => import('@/components/explosion/cubeScene'), {
  ssr: false,
})

export default async function Home() {
  const t = await getTranslations('Landingpage')
  // const session = await auth()
  // if (!!session?.user) {
  //   redirect('/browse')
  // }

  return (
    <main className="static h-screen snap-y snap-mandatory overflow-y-scroll">
      <section
        id="first-section"
        className="mt-20 flex h-screen snap-start flex-col font-space_grotesk lg:flex-row"
      >
        <Image
          className=" white-filter absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce"
          width={24}
          height={24}
          src="/icons/chevron-up.svg"
          alt="Chevron Arrow up Icon"
        />

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

      <section
        id="next-section"
        className="relative flex h-screen snap-start flex-col items-center justify-center bg-blue-400 pb-[10vh] font-space_grotesk text-white"
      >
        <h2 className="mb-8 text-center text-4xl font-bold">{t('secondSectionTitle')}</h2>
        <div className="mt-4 flex flex-col items-center space-y-8 md:flex-row md:space-x-16 md:space-y-0">
          <div className="flex flex-col items-center">
            <Image
              className="stroke-white"
              width={72}
              height={72}
              src="/icons/shield-plus.svg"
              alt="Schild Icon"
            />
            <p className="mt-2 text-4xl">{t('security')}</p>
          </div>
          <div className="color flex flex-col items-center">
            <Image
              className="stroke-white"
              width={72}
              height={72}
              src="/icons/cable.svg"
              alt="Kabel Icon"
            />
            <p className="mt-2 text-center text-4xl">{t('focus')}</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              className="stroke-white"
              width={72}
              height={72}
              src="/icons/paintbrush.svg"
              alt="Pinsel Icon"
            />
            <p className="mt-2 text-4xl">{t('design')}</p>
          </div>
        </div>
      </section>
      <section
        id="circle-section"
        className="relative flex h-screen snap-start flex-col items-center justify-center bg-blue-950 pb-[10vh] font-space_grotesk text-white"
      >
        <h2 className="mb-8 text-4xl font-bold">{t('thirdSectionTitle')}</h2>
        <div className="relative grid w-11/12 grid-cols-3 grid-rows-3 items-center justify-center">
          <div className="col-start-2 row-start-1 flex flex-col items-center justify-center text-center">
            <Image
              className="stroke-white"
              width={72}
              height={72}
              src="/icons/store.svg"
              alt="Laden Icon"
            />
            <p className="mt-2 text-3xl">{t('createShop')}</p>
          </div>
          <div className="col-start-2 row-start-3 flex flex-col items-center justify-center text-center">
            <Image
              className="stroke-white"
              width={72}
              height={72}
              src="/icons/handshake.svg"
              alt="Haendedruck Icon"
            />
            <p className="mt-2 text-3xl">{t('sell')}</p>
          </div>
          <div className="col-start-3 row-start-2 flex flex-col items-center justify-center text-center">
            <Image
              className="stroke-white"
              width={72}
              height={72}
              src="/icons/shopping-cart.svg"
              alt="Einkaufswagen Icon"
            />
            <p className="mt-2 text-3xl">{t('buy')}</p>
          </div>
          <div className="col-start-1 row-start-2 flex flex-col items-center justify-center text-center">
            <Image
              className="stroke-white"
              width={72}
              height={72}
              src="/icons/circle-user.svg"
              alt="User Icon"
            />
            <p className="mt-2 text-3xl">{t('createAccount')}</p>
          </div>
        </div>
      </section>
      <Link href="#first-section">
        <ScrollToTopButton />
      </Link>
    </main>
  )
}