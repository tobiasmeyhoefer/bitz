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
    <main className="static h-screen pt-16">
      <CubeScene />

      {/* Call-to-Action Button  */}

      <Link href={'/auth/login'}>
        <div className="absolute bottom-24 right-7 h-24 w-72 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 font-space_grotesk text-4xl text-white hover:scale-105 hover:opacity-85 md:right-24 md:w-96 lg:h-24">
          <div className="absolute right-6 mt-6 h-12 w-12 rounded-full bg-white md:right-9 md:mt-4 md:h-16 md:w-16">
            <ChevronRightIcon className="relative size-12 text-black md:size-16" />
          </div>
          <div className="relative left-0 mt-7 md:left-10">t("button")</div>
        </div>
      </Link>

      {/* Beschreibungstext  */}
      <div className="absolute left-8 rounded-md p-5 font-space_grotesk text-black drop-shadow-2xl  md:left-24 lg:bottom-16 lg:w-7/12">
        <p className="text-5xl">
          <em>Bitz</em>
        </p>
        <p className="mt-4 text-2xl">t("subtitle")</p>
        <p className="mt-4 text-xl">t("description")</p>
        <p className="mt-4 text-2xl">t("call")</p>
      </div>
    </main>
  )
}
