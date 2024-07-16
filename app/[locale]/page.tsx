/**
 * The main landing page component for the application.
 * It renders various sections of the landing page, including:
 * - Hero section
 * - Sponsors section
 * - About section
 * - How It Works section
 * - Testimonials section
 * - Team section
 * - Newsletter section
 * - FAQ section
 * - Scroll to Top button
 *
 * The content for these sections is imported from various child components.
 * The translations for the content are handled using the `useTranslations` hook from `next-intl`.
 */
import { About } from '@/components/landing-page/About'
import { FAQ } from '@/components/landing-page/faq'
import { Hero } from '@/components/landing-page/Hero'
import { HowItWorks } from '@/components/landing-page/HowItWorks'
import { Newsletter } from '@/components/landing-page/newsletter'
import { ScrollToTop } from '@/components/landing-page/ScrollToTop'
import { Sponsors } from '@/components/landing-page/sponsors'
import { Team } from '@/components/landing-page/team'
import { Testimonials } from '@/components/landing-page/testimonials'
import AnimatedCard from '@/components/ui/animated-card'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Landingpage')

  return (
    <>
      <Hero />
      <AnimatedCard delay={0.3}>
        <Sponsors />
      </AnimatedCard>
      <AnimatedCard delay={0.3}>
        <About />
      </AnimatedCard>
      <AnimatedCard delay={0.3}>
        <HowItWorks />
      </AnimatedCard>
      <AnimatedCard delay={0.3}>
        <Testimonials />
      </AnimatedCard>
      <AnimatedCard delay={0.3}>
        <Team />
      </AnimatedCard>
      <AnimatedCard delay={0.3}>
        <Newsletter />
      </AnimatedCard>
      <AnimatedCard delay={0.3}>
        <FAQ />
      </AnimatedCard>
      <ScrollToTop />
    </>
  )
}
