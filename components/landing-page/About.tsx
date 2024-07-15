import { Statistics } from '@/components/landing-page/statistics'
import pilot from '@/public/images/pilot.png'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const About = () => {
  const t = useTranslations('Landingpage.About')
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="rounded-lg border bg-muted/50 py-12">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          <Image src={pilot} alt="" className="w-[300px] rounded-lg object-contain" />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                {t('title')}{' '}
                <span className="bg-gradient-to-b from-card-foreground/60 to-card-foreground bg-clip-text text-transparent">
                  Bitz
                </span>
                ?
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. */}
                {t('WhatIsBitz')}
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  )
}
