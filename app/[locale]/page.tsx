import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
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
        <Button className="absolute bottom-24 right-24 h-36 w-1/4 rounded-full bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 px-8 font-space_grotesk text-4xl text-white ">
          <div className="absolute right-9 h-20 w-20 rounded-full bg-white">
            <ChevronRightIcon className="relative size-20 text-black" />
          </div>
          <div className="mr-24">
            <Link href={'/auth/login'}>{'Loslegen!'}</Link>
          </div>
        </Button>
      </Link>

      {/* Beschreibungstext  */}
      <div className="absolute bottom-16 left-24 w-11 rounded-md p-5 font-space_grotesk text-black drop-shadow-2xl  md:w-7/12">
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
