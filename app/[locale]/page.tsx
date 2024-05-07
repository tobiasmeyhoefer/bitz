import { auth } from '@/auth'
import { Link, redirect } from '@/navigation'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'

const CubeScene = dynamic(() => import('@/components/explosion/cubeScene'), {
  ssr: false,
})

export default async function Home() {
  const session = await auth()
  if (!!session?.user) {
    redirect('/browse')
  }

  return (
    <main className="static h-screen pt-16">
      <CubeScene />

      {/* Call-to-Action Button  */}

      <Link href={'/auth/login'}>
        <div className="absolute bottom-24 right-24 h-24 w-96 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 font-space_grotesk text-4xl text-white hover:scale-105 hover:opacity-85">
          <div className="absolute right-9 mt-4 h-16 w-16 rounded-full bg-white">
            <ChevronRightIcon className="relative size-16 text-black" />
          </div>
          <div className="relative left-10 mt-7">Loslegen</div>
        </div>
      </Link>

      {/* Beschreibungstext  */}
      <div className="absolute  left-24 rounded-md p-5 font-space_grotesk text-black drop-shadow-2xl  md:bottom-16 md:w-7/12">
        <p className="text-5xl">
          <em>Bitz</em>
        </p>
        <p className="mt-4 text-2xl">
          von heute für morgen mit Technik versorgen
        </p>
        <p className="mt-4 text-xl">
          Entdecke bei <em>Bitz</em> die neuesten Technikgeräte zu unschlagbaren
          Preisen! Kaufe, verkaufe und tausche deine Lieblingsgadgets in einer
          sicheren Umgebung. Trete unserer lebendigen Community bei und finde
          noch heute dein nächstes Technik-Highlight.
        </p>
        <p className="mt-4 text-2xl">Jetzt anmelden und durchstarten!</p>
      </div>
    </main>
  )
}
