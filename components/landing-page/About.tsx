/**
 * Renders the "About" section of the landing page.
 * 
 * This component displays information about the Bitz platform, including a title, description, and statistics.
 * The component uses the `useTranslations` hook from `next-intl` to retrieve localized strings for the content.
 * 
 * @returns {JSX.Element} The rendered "About" section
 */
import { Statistics } from './Statistics'
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
