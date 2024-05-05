import { auth } from '@/auth'
import dynamic from 'next/dynamic'
import { redirect } from '@/navigation'

const CubeScene = dynamic(() => import('@/components/explosion/cubeScene'), {
  ssr: false,
})

export default async function Home() {
  const session = await auth()
  if (!!session?.user) {
    redirect('/browse')
  }

  return (
    <main className="static h-screen pt-24">
      <CubeScene />
    </main>
  )
}
