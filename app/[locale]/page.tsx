import { About } from '@/components/landing-page/About'
import { FAQ } from '@/components/landing-page/FAQ'
import { Features } from '@/components/landing-page/Features'
import { Hero } from '@/components/landing-page/Hero'
import { HowItWorks } from '@/components/landing-page/HowItWorks'
import { Newsletter } from '@/components/landing-page/Newsletter'
import { ScrollToTop } from '@/components/landing-page/ScrollToTop'
import { Sponsors } from '@/components/landing-page/Sponsors'
import { Team } from '@/components/landing-page/Team'
import { Testimonials } from '@/components/landing-page/Testimonials'
import { Button } from '@/components/ui/button'
import ScrollToTopButton from '@/components/ui/scrollToTopButton'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { FaRegHandshake } from 'react-icons/fa6'
import {
  LuChevronUp,
  LuCpu,
  LuPaintbrush,
  LuShieldCheck,
  LuShoppingCart,
  LuStore,
  LuUserCircle,
} from 'react-icons/lu'
const CubeScene = dynamic(() => import('@/components/explosion/cubeScene'), {
  ssr: false,
})

export default function Home() {
  const t = useTranslations('Landingpage')

  return (
    // <main className="static h-screen snap-y snap-mandatory">
    //   <section
    //     id="first-section"
    //     className="mt-20 flex h-screen snap-start flex-col font-space_grotesk xl:flex-row"
    //   >
    //     <LuChevronUp
    //       title="Arrow up that indecates scollablity"
    //       className="absolute bottom-8 left-1/2 h-6 w-6 -translate-x-1/2 transform animate-bounce"
    //     />

    //     <div className="flex w-screen flex-col justify-center p-4 xl:mr-12 xl:w-1/2 xl:p-24">
    //       <h1 className="text-4xl font-bold xl:text-5xl">Bitz</h1>
    //       <h2 className="mt-16 text-xl xl:mt-4 xl:text-2xl">{t('subtitle')}</h2>
    //       <p className="mt-4 text-sm xl:text-xl">{t('description')}</p>
    //       <p className="mt-4 text-lg xl:text-xl">{t('call')}</p>
    //       <div className="mt-8 flex space-x-4">
    //         <Link href="/auth/login">
    //           <Button variant="callToAction" size={'lg'}>
    //             {t('callButton')}
    //           </Button>
    //         </Link>
    //         <Link href="#next-section">
    //           <Button variant="outline" size={'lg'}>
    //             {t('learnButton')}
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="flex h-1/2 w-screen items-center justify-center rounded-full xl:h-screen xl:w-screen xl:justify-center">
    //       <CubeScene />
    //     </div>
    //   </section>

    //   <section
    //     id="next-section"
    //     className="relative z-20 flex h-screen snap-start flex-col items-center justify-center bg-blue-400 pb-[10vh] font-space_grotesk text-white"
    //   >
    //     <h2 className="mb-8 text-center text-4xl font-bold">{t('secondSectionTitle')}</h2>
    //     <div className="mt-4 flex flex-col items-center space-y-8 md:flex-row md:space-x-16 md:space-y-0">
    //       <div className="flex flex-col items-center">
    //         <LuShieldCheck
    //           title="Shield Icon with a check Symbol inside"
    //           className="h-20 w-20" />
    //         <p className="mt-2 text-4xl">{t('security')}</p>
    //       </div>
    //       <div className="color flex flex-col items-center">
    //         <LuCpu
    //           title="A simplified CPU picture"
    //           className="h-20 w-20" />
    //         <p className="mt-2 text-center text-4xl">{t('focus')}</p>
    //       </div>
    //       <div className="flex flex-col items-center">
    //         <LuPaintbrush
    //           title="A thick Paintbrush"
    //           className="h-20 w-20" />
    //         <p className="mt-2 text-4xl">{t('design')}</p>
    //       </div>
    //     </div>
    //   </section>
    //   <section
    //     id="circle-section"
    //     className="relative z-20 flex h-screen snap-start flex-col items-center justify-center bg-blue-950 pb-[10vh] font-space_grotesk text-white"
    //   >
    //     <h2 className="mb-8 text-4xl font-bold">{t('thirdSectionTitle')}</h2>
    //     <div className="relative grid w-11/12 grid-cols-3 grid-rows-3 items-center justify-center">
    //       <div className="col-start-2 row-start-1 flex flex-col items-center justify-center text-center">
    //         <LuStore
    //           title="A simplified Icon of a Store"
    //           className="h-20 w-20" />
    //         <p className="mt-2 text-3xl">{t('createShop')}</p>
    //       </div>
    //       <div className="col-start-2 row-start-3 flex flex-col items-center justify-center text-center">
    //         <FaRegHandshake
    //           title="Two hands in a Line forming a handshake"
    //           className="h-20 w-20" />
    //         <p className="mt-2 text-3xl">{t('sell')}</p>
    //       </div>
    //       <div className="col-start-3 row-start-2 flex flex-col items-center justify-center text-center">
    //         <LuShoppingCart
    //           title="Simple Shopping Card in Sideview"
    //           className="h-20 w-20" />
    //         <p className="mt-2 text-3xl">{t('buy')}</p>
    //       </div>
    //       <div className="col-start-1 row-start-2 flex flex-col items-center justify-center text-center">
    //         <LuUserCircle
    //           title="A simple Depiction of a Person inside a Circle"
    //           className="h-20 w-20"
    //         />
    //         <p className="mt-2 text-3xl">{t('createAccount')}</p>
    //       </div>
    //     </div>
    //   </section>
    //   {/* <Link href="#first-section"> */}
    //     <ScrollToTopButton />
    //   {/* </Link> */}
    // </main>
    <>
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Testimonials />
      <Team />
      <Newsletter />
      <FAQ />
      <ScrollToTop />
    </>
  )
}
