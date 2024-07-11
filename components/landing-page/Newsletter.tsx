'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'

export const Newsletter = () => {
  return (
    <section id="newsletter">
      <hr className="mx-auto w-11/12" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl font-bold md:text-5xl">
          Join{' '}
          <span className="bg-gradient-to-b from-card-foreground/60 to-card-foreground bg-clip-text text-transparent">
            Bitz{' '}
          </span>
          Today
        </h3>
        <p className="mb-8 mt-4 text-center text-xl text-muted-foreground">
          von gestern für morgen
        </p>

        <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 md:w-6/12 md:flex-row md:gap-2 lg:w-4/12">
          <Link href={'/auth/login'} className="">
            <Button>Lets get started</Button>
          </Link>
        </div>
      </div>

      <hr className="mx-auto w-11/12" />
    </section>
  )
}
