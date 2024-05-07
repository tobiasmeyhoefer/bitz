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
    <main className="static h-screen pt-24">
      <CubeScene />

      <Button className="text-24 absolute bottom-24 right-24 h-36 w-1/4 rounded-full  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 font-montserrat text-4xl text-white ">
        <div className="absolute right-9 h-24 w-24 rounded-full bg-white">
          <ChevronRightIcon className="relative size-24 text-black" />
        </div>
        <div className="mr-24">
          <Link href={'/auth/login'}>{'Loslegen!'}</Link>
        </div>
      </Button>
    </main>
  )
}
