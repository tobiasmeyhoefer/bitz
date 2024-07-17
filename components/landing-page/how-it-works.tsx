/**
 * Renders the "How It Works" section of the landing page, displaying a grid of feature cards with icons, titles, and descriptions.
 *
 * The feature data is defined in the `features` array, which is mapped to render the individual feature cards.
 *
 * The section is wrapped in a container with some padding and centered text. The title uses a gradient background to highlight the key phrase.
 *
 * @returns {JSX.Element} The "How It Works" section component
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from '@/components/landing-page/icons'
import { useTranslations } from 'next-intl'
interface FeatureProps {
  icon: JSX.Element
  title: string
  description: string
}

export const HowItWorks = () => {
  const t = useTranslations('Landingpage.HowItWorks')

  const features: FeatureProps[] = [
    {
      icon: <MedalIcon />,
      title: t('step01'),
      description: t('step11'),
    },
    {
      icon: <MapIcon />,
      title: t('step02'),
      description: t('step22'),
    },
    {
      icon: <PlaneIcon />,
      title: t('step03'),
      description: t('step33'),
    },
    {
      icon: <GiftIcon />,
      title: t('step04'),
      description: t('step44'),
    },
  ]

  return (
    <section id="howItWorks" className="container py-24 text-center sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl ">
        {t('title01')}{' '}
        <span className="bg-gradient-to-b from-card-foreground/60 to-card-foreground bg-clip-text text-transparent">
          {t('title02')}{' '}
        </span>
        {t('title03')}
      </h2>
      <p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">{t('sub')}</p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid place-items-center gap-4">
                <span className="fill-white">{icon}</span>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
