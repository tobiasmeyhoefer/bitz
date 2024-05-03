import { auth } from '@/auth'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const CubeScene = dynamic(() => import('@/components/explosion/cubeScene'), {
  ssr: false,
})

export default async function Home() {
  const session = await auth()
  if (!!session?.user) {
    redirect('/browse')
  }

  return (
    // <div className="mt-10 h-full">
    //   <h1 className="bottom-0 text-9xl">Bitz</h1>
    //   <h2 className="text-4xl">von heute für morgen mit Technik versorgen</h2>
    //   <div className="right-0 size-96 w-full">
    <div className="min-h-screen bg-emerald-400">
      <CubeScene />
    </div>
    //   </div>
    // </div>
  )
}
