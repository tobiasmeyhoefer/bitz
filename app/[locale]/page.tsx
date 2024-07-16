import { About } from '@/components/landing-page/about'
import { FAQ } from '@/components/landing-page/faq'
import { Hero } from '@/components/landing-page/hero'
import { HowItWorks } from '@/components/landing-page/how-it-works'
import { Newsletter } from '@/components/landing-page/newsletter'
import { ScrollToTop } from '@/components/landing-page/scroll-to-top'
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
