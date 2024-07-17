/**
 * The `Newsletter` component renders a section for a newsletter signup form.
 * It includes a heading, a brief description, and a button to navigate to the login page.
 * The component is wrapped in a section with an `id` of "newsletter" and includes
 * horizontal rules above and below the content.
 */
'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'

type NewsletterProbs = {
  join: string
  today: string
  fromyesterdayfortomorrow: string
  getstarted: string
}

export const Newsletter = ({
  join,
  today,
  fromyesterdayfortomorrow,
  getstarted,
}: NewsletterProbs) => {
  return (
    <section id="newsletter">
      <hr className="mx-auto w-11/12" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl font-bold md:text-5xl">
          {join}{' '}
          <span className="bg-gradient-to-b from-card-foreground/60 to-card-foreground bg-clip-text text-transparent">
            Bitz{' '}
          </span>
          {today}
        </h3>
        <p className="mb-8 mt-4 text-center text-xl text-muted-foreground">
          {fromyesterdayfortomorrow}
        </p>

        <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 md:w-6/12 md:flex-row md:gap-2 lg:w-4/12">
          <Link href={'/auth/login'} className="">
            <Button>{getstarted}</Button>
          </Link>
        </div>
      </div>

      <hr className="mx-auto w-11/12" />
    </section>
  )
}
