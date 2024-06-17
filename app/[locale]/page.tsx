import { About } from '@/components/landing-page/About'
import { FAQ } from '@/components/landing-page/FAQ'
import { Hero } from '@/components/landing-page/Hero'
import { HowItWorks } from '@/components/landing-page/HowItWorks'
import { Newsletter } from '@/components/landing-page/Newsletter'
import { ScrollToTop } from '@/components/landing-page/ScrollToTop'
import { Sponsors } from '@/components/landing-page/Sponsors'
import { Team } from '@/components/landing-page/Team'
import { Testimonials } from '@/components/landing-page/Testimonials'
import AnimatedCard from '@/components/ui/animated-card'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Landingpage')

  return (
    <>
      <Hero />
      {/* <AnimatedCard delay={0.3}> */}
        <Sponsors />
      {/* </AnimatedCard> */}
      {/* <AnimatedCard delay={0.3}> */}
        <About />
      {/* </AnimatedCard> */}
      {/* <AnimatedCard delay={0.3}> */}
        <HowItWorks />
      {/* </AnimatedCard> */}
      {/* <AnimatedCard delay={0.3}> */}
        <Testimonials />
      {/* </AnimatedCard> */}
      {/* <AnimatedCard delay={0.3}> */}
        <Team />
      {/* </AnimatedCard> */}
      {/* <AnimatedCard delay={0.3}> */}
        <Newsletter />
      {/* </AnimatedCard> */}
      {/* <AnimatedCard delay={0.3}> */}
        <FAQ />
      {/* </AnimatedCard> */}
      <ScrollToTop />
    </>
  )
}
